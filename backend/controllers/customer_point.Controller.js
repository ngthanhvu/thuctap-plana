const db = require('../models');
const Customer_point = db.customer_point;

exports.getAll = async (req , res) => {
    try {
        const customer_point = await Customer_point.findAll();
        res.status(200).json(customer_point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req , res) => {
    try {
        const customer_point = await Customer_point.findByPk(req.params.id);
        if (!customer_point) {
            return res.status(404).json({ error: 'Customer point not found' });
        }
        res.status(200).json(customer_point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req , res) => {
    try {
        const customer_point = await Customer_point.create(req.body);
        res.status(201).json(customer_point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req , res) => {
    try {
        const customer_point = await Customer_point.findByPk(req.params.id);
        if (!customer_point) {
            return res.status(404).json({ error: 'Customer point not found' });
        }
        await customer_point.update(req.body);
        res.status(200).json(customer_point);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req , res) => {
    try {
        const customer_point = await Customer_point.findByPk(req.params.id);
        if (!customer_point) {
            return res.status(404).json({ error: 'Customer point not found' });
        }
        await customer_point.destroy();
        res.status(200).json({ message: 'Customer point deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};