const db = require('../models');
const Customer = db.Customer;
const CustomerPoint = db.CustomerPoint;

// Lấy danh sách khách hàng
exports.getAll = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            order: [['created_at', 'ASC']]
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tìm kiếm khách hàng
exports.search = async (req, res) => {
    try {
        const { query } = req.query;
        const customers = await Customer.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { name: { [db.Sequelize.Op.like]: `%${query}%` } },
                    { phone: { [db.Sequelize.Op.like]: `%${query}%` } }
                ]
            }
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo khách hàng mới
exports.create = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const customer = await Customer.create({ name, phone, email });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Khách hàng không tồn tại' });
        }
        await customer.destroy();
        res.status(200).json({ message: 'Khách hàng đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
