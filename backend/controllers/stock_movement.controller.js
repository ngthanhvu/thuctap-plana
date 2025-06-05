const db = require('../models');
const Stock_movement = db.stock_movement;

exports.getAll = async (req, res) => {
    try {
        const stock_movements = await Stock_movement.findAll();
        res.status(200).json(stock_movements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const stock_movement = await Stock_movement.findByPk(req.params.id);
        if (!stock_movement) {
            return res.status(404).json({ error: 'Stock movement not found' });
        }
        res.status(200).json(stock_movement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newStockMovement = await Stock_movement.create(req.body);
        res.status(201).json(newStockMovement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const stock_movement = await Stock_movement.findByPk(req.params.id);
        if (!stock_movement) {
            return res.status(404).json({ error: 'Stock movement not found' });
        }
        await stock_movement.update(req.body);
        res.status(200).json(stock_movement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const stock_movement = await Stock_movement.findByPk(req.params.id);
        if (!stock_movement) {
            return res.status(404).json({ error: 'Stock movement not found' });
        }
        await stock_movement.destroy();
        res.status(200).json({ message: 'Stock movement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};