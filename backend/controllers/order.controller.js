const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const Customer = db.Customer;
const Staff = db.Staff;
const PosSession = db.PosSession;
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    ALL_ORDERS: 'orders:all'
};

const CACHE_TTL = 300;

exports.getAll = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.ALL_ORDERS);
        if (cached) {
            return res.json(cached);
        }

        const orders = await Order.findAll({
            where: {
                deleted_at: null
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

        await cacheService.set(CACHE_KEYS.ALL_ORDERS, orders, CACHE_TTL);

        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: err.message });
    }
};
