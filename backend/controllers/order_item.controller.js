const db = require('../models');
const OrderItem = db.order_item;

exports.getAll = (req, res) => {
    try {
        const order_items = OrderItem.findAll();
        res.status(200).json(order_items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const order_item = await OrderItem.findByPk(req.params.id);
        if (!order_item) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        res.status(200).json(order_item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const order_item = await OrderItem.create(req.body);
        res.status(201).json(order_item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const order_item = await OrderItem.findByPk(req.params.id);
        if (!order_item) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        await order_item.update(req.body);
        res.status(200).json(order_item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const order_item = await OrderItem.findByPk(req.params.id);
        if (!order_item) {
            return res.status(404).json({ error: 'Order item not found' });
        }
        await order_item.destroy();
        res.status(200).json({ message: 'Order item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};