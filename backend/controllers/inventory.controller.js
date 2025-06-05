const db = require('../models');
const Inventory = db.inventory;

exports.getAll = async (req, res) => {
    try {
        const inventories = await Inventory.findAll();
        res.json(inventories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newInventory = await Inventory.create(req.body);
        res.status(201).json(newInventory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        await inventory.update(req.body);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        await inventory.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};