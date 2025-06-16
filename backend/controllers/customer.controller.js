const db = require('../models');
const cacheService = require('../services/cache.service');

const Customer = db.Customer;
const CustomerPoint = db.CustomerPoint;

const CACHE_KEYS = {
    ALL_CUSTOMERS: 'customers:all'
};
const CACHE_TTL = 3600; // 1 giờ

// Lấy danh sách khách hàng
exports.getAll = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.ALL_CUSTOMERS);
        if (cached) {
            return res.json(cached);
        }

        const customers = await Customer.findAll({
            where: {
                deleted_at: null
            },
            order: [['created_at', 'ASC']]
        });

        await cacheService.set(CACHE_KEYS.ALL_CUSTOMERS, customers, CACHE_TTL);
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tìm kiếm khách hàng (không cache vì có query động)
exports.search = async (req, res) => {
    try {
        const { query } = req.query;
        const customers = await Customer.findAll({
            where: {
                deleted_at: null,
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

        // Xoá cache cũ sau khi thêm
        await cacheService.del(CACHE_KEYS.ALL_CUSTOMERS);

        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xoá khách hàng
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Khách hàng không tồn tại' });
        }

        // Soft delete the customer
        await customer.destroy();

        // Xoá cache sau khi xoá dữ liệu
        await cacheService.del(CACHE_KEYS.ALL_CUSTOMERS);

        res.status(200).json({ message: 'Khách hàng đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
