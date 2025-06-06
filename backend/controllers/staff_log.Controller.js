const db = require('../models');
const Staff_log = db.staff_log;

exports.getAll = async (req, res ) => {
    try {
        const staff_log = await Staff_log.findAll();
        res.status(200).json(staff_log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res ) => {
    try {
        const staff_log = await Staff_log.findByPk(req.params.id);
        if (!staff_log) {
            return res.status(404).json({ error: 'Staff log not found' });
        }
        res.status(200).json(staff_log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res ) => {
    try {
        const staff_log = await Staff_log.create(req.body);
        res.status(201).json(staff_log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res ) => {
    try {
        const staff_log = await Staff_log.findByPk(req.params.id);
        if (!staff_log) {
            return res.status(404).json({ error: 'Staff log not found' });
        }
        await staff_log.update(req.body);
        res.status(200).json(staff_log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res ) => {
    try {
        const staff_log = await Staff_log.findByPk(req.params.id);
        if (!staff_log) {
            return res.status(404).json({ error: 'Staff log not found' });
        }
        await staff_log.destroy();
        res.status(200).json({ message: 'Staff log deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};