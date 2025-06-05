const db = require('../models');
const Role = db.role;

exports.getAll = async (req, res ) => {
    try {
        const role = await Role.findAll();
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res ) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res ) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res ) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        await role.update(req.body);
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res ) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};