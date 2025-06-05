const db = require('../models');
const Stock_movement_item = db.stock_movement_item;

exports.getAll = async (req, res) => {
    try {
        const stock_movement_items = await Stock_movement_item.findAll();
        res.status(200).json(stock_movement_items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const stock_movement_item = await Stock_movement_item.findByPk(req.params.id);
        if (!stock_movement_item) {
            return res.status(404).json({ error: 'Stock movement item not found' });
        }
        res.status(200).json(stock_movement_item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newStockMovementItem = await Stock_movement_item.create(req.body);
        res.status(201).json(newStockMovementItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const stock_movement_item = await Stock_movement_item.findByPk(req.params.id);
        if (!stock_movement_item) {
            return res.status(404).json({ error: 'Stock movement item not found' });
        }
        await stock_movement_item.update(req.body);
        res.status(200).json(stock_movement_item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const stock_movement_item = await Stock_movement_item.findByPk(req.params.id);
        if (!stock_movement_item) {
            return res.status(404).json({ error: 'Stock movement item not found' });
        }
        await stock_movement_item.destroy();
        res.status(200).json({ message: 'Stock movement item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};