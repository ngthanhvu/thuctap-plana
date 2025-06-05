const db = require('../models');
const Pos_register = db.pos_register;

exports.getAll = async (req, res) => {
    try {
        const pos_registers = await Pos_register.findAll();
        res.status(200).json(pos_registers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const pos_register = await Pos_register.findByPk(req.params.id);
        if (!pos_register) {
            return res.status(404).json({ error: 'Pos register not found' });
        }
        res.status(200).json(pos_register);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const pos_register = await Pos_register.create(req.body);
        res.status(201).json(pos_register);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const pos_register = await Pos_register.findByPk(req.params.id);
        if (!pos_register) {
            return res.status(404).json({ error: 'Pos register not found' });
        }
        await pos_register.update(req.body);
        res.status(200).json(pos_register);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const pos_register = await Pos_register.findByPk(req.params.id);
        if (!pos_register) {
            return res.status(404).json({ error: 'Pos register not found' });
        }
        await pos_register.destroy();
        res.status(200).json({ message: 'Pos register deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};