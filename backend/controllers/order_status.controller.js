const db = require('../models');
const Order_status = db.order_status;

exports.getAll = async (req, res) => {
    try {
        const order_statuses = Order_status.findAll();
        res.status(200).json(order_statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const order_status = await Order_status.findByPk(req.params.id);
        if (!order_status) {
            return res.status(404).json({ error: 'Order status not found' });
        }
        res.status(200).json(order_status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const order_status = await Order_status.create(req.body);
        res.status(201).json(order_status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const order_status = await Order_status.findByPk(req.params.id);
        if (!order_status) {
            return res.status(404).json({ error: 'Order status not found' });
        }
        await order_status.update(req.body);
        res.status(200).json(order_status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const order_status = await Order_status.findByPk(req.params.id);
        if (!order_status) {
            return res.status(404).json({ error: 'Order status not found' });
        }
        await order_status.destroy();
        res.status(200).json({ message: 'Order status deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};