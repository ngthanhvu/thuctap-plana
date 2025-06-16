const db = require('../models');
const cacheService = require('../services/cache.service');

const PosSession = db.PosSession;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Customer = db.Customer;
const CustomerPoint = db.CustomerPoint;
const StockMovement = db.StockMovement;
const StockMovementItem = db.StockMovementItem;
const Inventory = db.Inventory;
const Product = db.Product;
const Staff = db.Staff;
const SalesReport = db.SalesReport;

const CACHE_KEYS = {
    SALES_REPORT: (sessionId, date) => `sales_report:${sessionId || 'all'}:${date || 'all'}`,
    SUMMARY_REPORT: (sessionId) => `summary_report:${sessionId || 'all'}`
};
const CACHE_TTL = 300; // 5 phút

exports.startSession = async (req, res) => {
    try {
        const { staff_id, opening_cash = 0 } = req.body;

        const activeSession = await PosSession.findOne({
            where: {
                staff_id,
                status: 'active',
                deleted_at: null
            }
        });

        if (activeSession) {
            return res.status(400).json({ message: 'Nhân viên đã có phiên POS đang hoạt động' });
        }

        const session = await PosSession.create({
            staff_id,
            opening_cash,
            status: 'active'
        });

        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.endSession = async (req, res) => {
    try {
        const { session_id, closing_cash } = req.body;

        const session = await PosSession.findOne({
            where: {
                id: session_id,
                deleted_at: null
            }
        });
        if (!session) {
            return res.status(404).json({ message: 'Không tìm thấy phiên POS' });
        }

        await session.update({
            status: 'closed',
            end_time: new Date(),
            closing_cash
        });

        await cacheService.del(CACHE_KEYS.SUMMARY_REPORT(session_id));

        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOrder = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const {
            customer_id,
            staff_id,
            pos_session_id,
            items,
            subtotal,
            discount,
            tax,
            total,
            payment_method
        } = req.body;

        const order_number = `HD${Date.now()}`;

        const order = await Order.create({
            order_number,
            customer_id,
            staff_id,
            pos_session_id,
            subtotal,
            discount,
            tax,
            total,
            payment_method,
            status: 'completed'
        }, { transaction });

        for (const item of items) {
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.quantity * item.unit_price
            }, { transaction });
        }

        const stockMovement = await StockMovement.create({
            type: 'export',
            created_by: staff_id,
            note: `Xuất kho cho đơn hàng ${order_number}`
        }, { transaction });

        for (const item of items) {
            await StockMovementItem.create({
                stock_movement_id: stockMovement.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price
            }, { transaction });

            const inventory = await Inventory.findOne({
                where: {
                    product_id: item.product_id,
                    deleted_at: null
                }
            });

            if (inventory) {
                await inventory.update({
                    quantity: inventory.quantity - item.quantity,
                    updated_at: new Date()
                }, { transaction });
            }
        }

        const today = new Date().toISOString().split('T')[0];
        let salesReport = await SalesReport.findOne({
            where: {
                pos_session_id,
                date: today,
                deleted_at: null
            }
        });

        if (!salesReport) {
            salesReport = await SalesReport.create({
                pos_session_id,
                date: today,
                total_cash_sales: payment_method === 'cash' ? total : 0,
                total_card_sales: payment_method === 'card' ? total : 0,
                total_orders: 1
            }, { transaction });
        } else {
            const updateData = {
                total_orders: salesReport.total_orders + 1
            };

            if (payment_method === 'cash') {
                updateData.total_cash_sales = parseFloat(salesReport.total_cash_sales) + parseFloat(total);
            } else if (payment_method === 'card') {
                updateData.total_card_sales = parseFloat(salesReport.total_card_sales) + parseFloat(total);
            }

            await salesReport.update(updateData, { transaction });
        }

        if (customer_id) {
            const pointsEarned = Math.floor(total / 1000);
            if (pointsEarned > 0) {
                await CustomerPoint.create({
                    customer_id,
                    order_id: order.id,
                    points: pointsEarned,
                    type: 'earned',
                    description: `Tích điểm từ đơn hàng ${order_number}`
                }, { transaction });

                const customer = await Customer.findOne({
                    where: {
                        id: customer_id,
                        deleted_at: null
                    }
                });
                if (customer) {
                    await customer.update({
                        points: customer.points + pointsEarned
                    }, { transaction });
                }
            }
        }

        await transaction.commit();

        await cacheService.del(CACHE_KEYS.SALES_REPORT(pos_session_id, today));
        await cacheService.del(CACHE_KEYS.SUMMARY_REPORT(pos_session_id));

        const orderWithDetails = await Order.findOne({
            where: {
                id: order.id,
                deleted_at: null
            },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        where: { deleted_at: null }
                    }]
                },
                {
                    model: Customer,
                    as: 'customer',
                    where: { deleted_at: null }
                }
            ]
        });

        res.status(201).json(orderWithDetails);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

exports.getSalesReport = async (req, res) => {
    try {
        const { session_id, date } = req.query;
        const cacheKey = CACHE_KEYS.SALES_REPORT(session_id, date);
        const cached = await cacheService.get(cacheKey);
        if (cached) {
            return res.json(cached);
        }

        const whereClause = {
            deleted_at: null
        };
        if (session_id) whereClause.pos_session_id = session_id;
        if (date) whereClause.date = date;

        const reports = await SalesReport.findAll({
            where: whereClause,
            include: [{
                model: PosSession,
                as: 'posSession',
                where: { deleted_at: null },
                include: [{
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name'],
                    where: { deleted_at: null }
                }]
            }],
            order: [['date', 'DESC']]
        });

        await cacheService.set(cacheKey, reports, CACHE_TTL);

        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSummaryReport = async (req, res) => {
    try {
        const { session_id } = req.query;
        const cacheKey = CACHE_KEYS.SUMMARY_REPORT(session_id);
        const cached = await cacheService.get(cacheKey);
        if (cached) {
            return res.json(cached);
        }

        const whereClause = session_id ? { pos_session_id: session_id } : {};

        const summary = await SalesReport.findOne({
            where: whereClause,
            attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('total_cash_sales')), 'total_cash'],
                [db.sequelize.fn('SUM', db.sequelize.col('total_card_sales')), 'total_card'],
                [db.sequelize.fn('SUM', db.sequelize.col('total_orders')), 'total_orders']
            ],
            raw: true
        });

        const totalSales = parseFloat(summary.total_cash || 0) + parseFloat(summary.total_card || 0);

        const result = {
            total_cash_sales: parseFloat(summary.total_cash || 0),
            total_card_sales: parseFloat(summary.total_card || 0),
            total_sales: totalSales,
            total_orders: parseInt(summary.total_orders || 0)
        };

        await cacheService.set(cacheKey, result, CACHE_TTL);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.generatePaymentQR = async (req, res) => {
    try {
        const { amount, order_number } = req.body;

        const qrData = {
            amount: amount,
            order_number: order_number,
            merchant_id: 'POS_SYSTEM_001',
            timestamp: Date.now()
        };

        const qrString = JSON.stringify(qrData);

        res.json({
            qr_data: qrString,
            qr_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`,
            expires_in: 300
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveDraft = async (req, res) => {
    try {
        const {
            customer_id,
            staff_id,
            pos_session_id,
            items,
            subtotal,
            discount,
            tax,
            total
        } = req.body;

        const order_number = `DRAFT${Date.now()}`;

        const order = await Order.create({
            order_number,
            customer_id,
            staff_id,
            pos_session_id,
            subtotal,
            discount,
            tax,
            total,
            payment_method: 'pending',
            status: 'pending'
        });

        for (const item of items) {
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.quantity * item.unit_price
            });
        }

        res.status(201).json({ message: 'Đã lưu đơn hàng tạm', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const { order_id } = req.params;

        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        await order.update({ status: 'cancelled' });

        res.json({ message: 'Đã hủy đơn hàng', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
