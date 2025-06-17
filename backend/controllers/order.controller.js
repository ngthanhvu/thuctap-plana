const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const Customer = db.Customer;
const Staff = db.Staff;
const PosSession = db.PosSession;
const cacheService = require('../services/cache.service');
const { Op } = require('sequelize');

const CACHE_KEYS = {
    ALL_ORDERS: 'orders:all'
};

const CACHE_TTL = 300;

exports.getAll = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cached = await cacheService.get(CACHE_KEYS.ALL_ORDERS);
        if (cached) {
            if (req.user.role === 'admin') {
                return res.json(cached);
            } else {
                const filteredOrders = cached.filter(order => order.staff_id === req.user.id);
                return res.json(filteredOrders);
            }
        }

        const whereClause = {
            deleted_at: null
        };

        if (req.user.role !== 'admin') {
            whereClause.staff_id = req.user.id;
        }

        const orders = await Order.findAll({
            where: whereClause,
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'image']
                    }]
                },
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name', 'phone', 'email', 'points']
                },
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: PosSession,
                    as: 'posSession',
                    attributes: ['id', 'start_time', 'end_time', 'status']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        await cacheService.set(CACHE_KEYS.ALL_ORDERS, orders, CACHE_TTL);

        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.getOrdersByStaff = async (req, res) => {
    try {
        const staffId = req.user.id;

        const orders = await Order.findAll({
            where: {
                deleted_at: null,
                staff_id: staffId
            },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'image']
                    }]
                },
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name', 'phone', 'email', 'points']
                },
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: PosSession,
                    as: 'posSession',
                    attributes: ['id', 'start_time', 'end_time', 'status']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders by staff:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.getSalesReport = async (req, res) => {
    try {
        const { period = 'today' } = req.query;
        const staffId = req.user.id;

        let startDate, endDate;
        const now = new Date();

        switch (period) {
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                endDate = new Date();
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'custom':
                startDate = new Date(req.query.start_date);
                endDate = new Date(req.query.end_date);
                break;
            default: // today
                startDate = new Date(now.setHours(0, 0, 0, 0));
                endDate = new Date(now.setHours(23, 59, 59, 999));
        }

        const orders = await Order.findAll({
            where: {
                staff_id: staffId,
                created_at: {
                    [Op.between]: [startDate, endDate]
                },
                deleted_at: null
            },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product'
                    }]
                }
            ]
        });

        // Calculate sales report
        const report = {
            total_sales: 0,
            total_cash_sales: 0,
            total_card_sales: 0,
            cash_orders: 0,
            card_orders: 0,
            total_orders: orders.length,
            top_products: []
        };

        // Product sales tracking
        const productSales = {};

        orders.forEach(order => {
            const orderTotal = order.total_amount;
            report.total_sales += orderTotal;

            if (order.payment_method === 'cash') {
                report.total_cash_sales += orderTotal;
                report.cash_orders++;
            } else {
                report.total_card_sales += orderTotal;
                report.card_orders++;
            }

            // Track product sales
            order.items.forEach(item => {
                const productId = item.product.id;
                if (!productSales[productId]) {
                    productSales[productId] = {
                        id: productId,
                        name: item.product.name,
                        total_quantity: 0,
                        total_revenue: 0
                    };
                }
                productSales[productId].total_quantity += item.quantity;
                productSales[productId].total_revenue += item.price * item.quantity;
            });
        });

        // Convert product sales to array and sort by revenue
        report.top_products = Object.values(productSales)
            .sort((a, b) => b.total_revenue - a.total_revenue)
            .slice(0, 5);

        res.json(report);
    } catch (err) {
        console.error('Error generating sales report:', err);
        res.status(500).json({ message: err.message });
    }
};
