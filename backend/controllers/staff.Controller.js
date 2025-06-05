const db = require('../models');
const Staff = db.staff;


exports.getAll = async (req, res ) => {
    try {
        const staff = await Staff.findAll();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res ) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res ) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res ) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        await staff.update(req.body);
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res ) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        await staff.destroy();
        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};