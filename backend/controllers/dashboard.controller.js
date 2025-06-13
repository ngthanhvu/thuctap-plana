const db = require('../models');
const cacheService = require('../services/cache.service');
const { Op, fn, col } = require('sequelize');

const Order = db.Order;
const Customer = db.Customer;
const Product = db.Product;

const CACHE_KEYS = {
    DASHBOARD: 'dashboard:data'
};
const CACHE_TTL = 300; // 5 phút

exports.getDashboardData = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.DASHBOARD);
        if (cached) {
            return res.json(cached);
        }

        // Lấy tổng doanh thu
        const totalRevenue = await Order.sum('total', {
            where: { status: 'completed' }
        });

        // Lấy tổng số đơn hàng
        const totalOrders = await Order.count();

        // Lấy tổng số khách hàng
        const totalCustomers = await Customer.count();

        // Lấy tổng số sản phẩm
        const totalProducts = await Product.count();

        // Lấy thống kê doanh thu theo tháng trong năm hiện tại
        const currentYear = new Date().getFullYear();
        const revenueByMonth = await Order.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('created_at'), '%m'), 'month'],
                [fn('SUM', col('total')), 'total_revenue']
            ],
            where: {
                status: 'completed',
                created_at: {
                    [Op.between]: [
                        new Date(currentYear, 0, 1),
                        new Date(currentYear, 11, 31)
                    ]
                }
            },
            group: [fn('DATE_FORMAT', col('created_at'), '%m')],
            order: [[col('month'), 'ASC']]
        });

        // Lấy thống kê số đơn hàng theo tháng trong năm hiện tại
        const ordersByMonth = await Order.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('created_at'), '%m'), 'month'],
                [fn('COUNT', '*'), 'total_orders']
            ],
            where: {
                created_at: {
                    [Op.between]: [
                        new Date(currentYear, 0, 1),
                        new Date(currentYear, 11, 31)
                    ]
                }
            },
            group: [fn('DATE_FORMAT', col('created_at'), '%m')],
            order: [[col('month'), 'ASC']]
        });

        // Lấy các đơn hàng gần đây
        const recentOrders = await Order.findAll({
            include: [{
                model: Customer,
                as: 'customer',
                attributes: ['name', 'email']
            }],
            order: [['created_at', 'DESC']],
            limit: 5
        });

        // Chuẩn bị dữ liệu cho biểu đồ
        const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
        const chartData = {
            revenue: months.map(month => {
                const data = revenueByMonth.find(item => item.dataValues.month === month);
                return data ? Number(data.dataValues.total_revenue) : 0;
            }),
            orders: months.map(month => {
                const data = ordersByMonth.find(item => item.dataValues.month === month);
                return data ? Number(data.dataValues.total_orders) : 0;
            })
        };

        const dashboardData = {
            totalRevenue: totalRevenue || 0,
            totalOrders,
            totalCustomers,
            totalProducts,
            recentOrders,
            chartData
        };

        await cacheService.set(CACHE_KEYS.DASHBOARD, dashboardData, CACHE_TTL);

        res.json(dashboardData);
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy dữ liệu dashboard',
            error: error.message
        });
    }
};
