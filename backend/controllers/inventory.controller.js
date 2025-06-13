const db = require('../models');
const Inventory = db.Inventory;
const Product = db.Product;
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    ALL_INVENTORIES: 'inventories:all',
    INVENTORY_BY_PRODUCT: (productId) => `inventories:product:${productId}`
};
const CACHE_TTL = 3600;

exports.getAll = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.ALL_INVENTORIES);
        if (cached) {
            return res.json(cached);
        }

        const inventories = await Inventory.findAll({
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'sku', 'barcode']
            }],
            order: [['updated_at', 'DESC']]
        });

        await cacheService.set(CACHE_KEYS.ALL_INVENTORIES, inventories, CACHE_TTL);
        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const cached = await cacheService.get(CACHE_KEYS.INVENTORY_BY_PRODUCT(productId));
        if (cached) {
            return res.json(cached);
        }

        const inventory = await Inventory.findOne({
            where: { product_id: productId },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'sku', 'barcode']
            }]
        });

        if (!inventory) {
            return res.status(404).json({ message: 'Không tìm thấy tồn kho cho sản phẩm này' });
        }

        await cacheService.set(CACHE_KEYS.INVENTORY_BY_PRODUCT(productId), inventory, CACHE_TTL);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        const [inventory, created] = await Inventory.findOrCreate({
            where: { product_id },
            defaults: {
                product_id,
                quantity: quantity || 0,
                updated_at: new Date()
            }
        });

        if (!created) {
            inventory.quantity = quantity;
            inventory.updated_at = new Date();
            await inventory.save();
        }

        await cacheService.del(CACHE_KEYS.ALL_INVENTORIES);
        await cacheService.del(CACHE_KEYS.INVENTORY_BY_PRODUCT(product_id));

        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};