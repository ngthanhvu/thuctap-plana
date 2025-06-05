const db = require('../models');
const Brand = db.Brand;

exports.getAll = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const brand = await Brand.create(req.body);
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




