const db = require('../models');
const Staffs = db.Staff;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

exports.create = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingStaff = await Staffs.findOne({ where: { email } });
        if (existingStaff) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await Staffs.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            status: 'active',
            created_at: new Date()
        });

        res.status(201).json({
            id: newStaff.id,
            name: newStaff.name,
            email: newStaff.email,
            phone: newStaff.phone,
            role: newStaff.role,
            status: newStaff.status
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const staff = await Staffs.findOne({ where: { email } });
        if (!staff) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: staff.id, email: staff.email, role: staff.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            staff: {
                id: staff.id,
                name: staff.name,
                email: staff.email,
                phone: staff.phone,
                role: staff.role,
                status: staff.status
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInfo = async (req, res) => {
    try {
        const staff = await Staffs.findByPk(req.user.id, {
            attributes: { exclude: ['password', 'created_at', 'updated_at'] }
        });

        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getListInfo = async (req, res) => {
    try {
        const staffs = await Staffs.findAll({
            attributes: { exclude: ['password', 'created_at', 'updated_at'] }
        });

        res.json(staffs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = exports;