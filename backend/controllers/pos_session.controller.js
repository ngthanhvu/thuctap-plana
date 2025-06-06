const db = require('../models');
const Pos_session = db.pos_session;

exports.getAll = async (req, res) => {
    try {
        const pos_sessions = Pos_session.findAll();
        res.status(200).json(pos_sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const pos_session = await Pos_session.findByPk(req.params.id);
        if (!pos_session) {
            return res.status(404).json({ error: 'Pos session not found' });
        }
        res.status(200).json(pos_session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newPosSession = await Pos_session.create(req.body);
        res.status(201).json(newPosSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const pos_session = await Pos_session.findByPk(req.params.id);
        if (!pos_session) {
            return res.status(404).json({ error: 'Pos session not found' });
        }
        await pos_session.update(req.body);
        res.status(200).json(pos_session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const pos_session = await Pos_session.findByPk(req.params.id);
        if (!pos_session) {
            return res.status(404).json({ error: 'Pos session not found' });
        }
        await pos_session.destroy();
        res.status(200).json({ message: 'Pos session deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};