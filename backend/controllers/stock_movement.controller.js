const db = require('../models');
const StockMovement = db.StockMovement;
const StockMovementItem = db.StockMovementItem;
const Inventory = db.Inventory;
const Product = db.Product;
const Staff = db.Staff;
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    ALL_MOVEMENTS: 'stock_movements:all',
    MOVEMENT_BY_ID: (id) => `stock_movements:${id}`
};
const CACHE_TTL = 300;

exports.getAll = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.ALL_MOVEMENTS);
        if (cached) {
            return res.json(cached);
        }

        const movements = await StockMovement.findAll({
            where: {
                deleted_at: null
            },
            include: [
                {
                    model: Staff,
                    as: 'creator',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: StockMovementItem,
                    as: 'items',
                    where: { deleted_at: null },
                    required: false,
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'sku']
                    }]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        await cacheService.set(CACHE_KEYS.ALL_MOVEMENTS, movements, CACHE_TTL);
        res.json(movements);
    } catch (error) {
        console.error('Error fetching stock movements:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const cached = await cacheService.get(CACHE_KEYS.MOVEMENT_BY_ID(id));
        if (cached) {
            return res.json(cached);
        }

        const movement = await StockMovement.findOne({
            where: {
                id: id,
                deleted_at: null
            },
            include: [
                {
                    model: Staff,
                    as: 'creator',
                    attributes: ['id', 'name', 'email'],
                    where: { deleted_at: null }
                },
                {
                    model: StockMovementItem,
                    as: 'items',
                    where: { deleted_at: null },
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'sku'],
                        where: { deleted_at: null }
                    }]
                }
            ]
        });

        if (!movement) {
            return res.status(404).json({ message: 'Không tìm thấy phiếu nhập/xuất' });
        }

        await cacheService.set(CACHE_KEYS.MOVEMENT_BY_ID(id), movement, CACHE_TTL);
        res.json(movement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { type, note, items } = req.body;
        const staff_id = req.user?.id || req.body.created_by || 1;

        const movement = await StockMovement.create({
            type,
            staff_id,
            note,
            created_at: new Date()
        }, { transaction });

        for (const item of items) {
            await StockMovementItem.create({
                stock_movement_id: movement.id,
                product_id: item.product_id,
                quantity: item.quantity
            }, { transaction });

            const [inventory] = await Inventory.findOrCreate({
                where: {
                    product_id: item.product_id,
                    deleted_at: null
                },
                defaults: {
                    product_id: item.product_id,
                    quantity: 0,
                    updated_at: new Date()
                },
                transaction
            });

            if (type === 'import') {
                inventory.quantity += item.quantity;
            } else if (type === 'export') {
                inventory.quantity -= item.quantity;
                if (inventory.quantity < 0) {
                    throw new Error(`Không đủ tồn kho cho sản phẩm ID: ${item.product_id}`);
                }
            }

            inventory.updated_at = new Date();
            await inventory.save({ transaction });
        }

        await transaction.commit();

        await cacheService.del(CACHE_KEYS.ALL_MOVEMENTS);
        await cacheService.del('inventories:all');

        res.status(201).json(movement);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const id = req.params.id;

        const movement = await StockMovement.findOne({
            where: {
                id: id,
                deleted_at: null
            },
            include: [{
                model: StockMovementItem,
                as: 'items',
                where: { deleted_at: null }
            }]
        });

        if (!movement) {
            return res.status(404).json({ message: 'Không tìm thấy phiếu nhập/xuất' });
        }

        for (const item of movement.items) {
            const inventory = await Inventory.findOne({
                where: {
                    product_id: item.product_id,
                    deleted_at: null
                },
                transaction
            });

            if (inventory) {
                if (movement.type === 'import') {
                    inventory.quantity -= item.quantity;
                } else if (movement.type === 'export') {
                    inventory.quantity += item.quantity;
                }
                inventory.updated_at = new Date();
                await inventory.save({ transaction });
            }
        }

        // Soft delete stock movement items
        await StockMovementItem.update(
            { deleted_at: new Date() },
            {
                where: { stock_movement_id: id },
                transaction
            }
        );

        // Soft delete stock movement
        await movement.update(
            { deleted_at: new Date() },
            { transaction }
        );

        await transaction.commit();

        await cacheService.del(CACHE_KEYS.ALL_MOVEMENTS);
        await cacheService.del(CACHE_KEYS.MOVEMENT_BY_ID(id));
        await cacheService.del('inventories:all');

        res.json({ message: 'Xóa phiếu nhập/xuất thành công' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};