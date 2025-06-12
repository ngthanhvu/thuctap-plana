const db = require('../models');
const Order = db.Order;

exports.getAll = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(
            orders
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
