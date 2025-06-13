const db = require('../models');
const Order = db.Order;
const cacheService = require('../services/cache.service'); // dùng chuẩn như Inventory

const CACHE_KEYS = {
    ALL_ORDERS: 'orders:all'
};

const CACHE_TTL = 3600; // 1 giờ

exports.getAll = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.ALL_ORDERS);
        if (cached) {
            return res.json(cached);
        }

        const orders = await Order.findAll();

        await cacheService.set(CACHE_KEYS.ALL_ORDERS, orders, CACHE_TTL);

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
