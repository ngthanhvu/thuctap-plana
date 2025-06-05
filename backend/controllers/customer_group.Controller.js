const db = require('../models');
const Customer_group = db.customer_group;

exports.getAll = async (req, res) => {
    try {
        const customer_groups = await Customer_group.findAll();
        res.status(200).json(customer_groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const customer_group = await Customer_group.findByPk(req.params.id);
        if (!customer_group) {
            return res.status(404).json({ error: 'Customer group not found' });
        }
        res.status(200).json(customer_group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const customer_group = await Customer_group.create(req.body);
        res.status(201).json(customer_group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.update = async (req, res) => {
    try {
        const customer_group = await Customer_group.create(req.body);
        if(!customer_group) {
            return res.status(404).json({ error: 'Customer group not found' });
        }
        res.status(200).json(customer_group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res ) => {
    try {
        const customer_group = await Customer_group.findByPk(req.params.id);
        if (!customer_group) {
            return res.status(404).json({ error: 'Customer group not found' });
        }
        await customer_group.destroy();
        res.status(200).json({ message: 'Customer group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};