const db = require('../models');
const cacheService = require('../services/cache.service');
const { Op, fn, col, literal } = require('sequelize');

const Order = db.Order;
const Customer = db.Customer;
const Product = db.Product;
const Staff = db.Staff;
const OrderItem = db.OrderItem;
const InventoryTransaction = db.InventoryTransaction;

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

        const totalRevenue = await Order.sum('total', {
            where: {
                status: 'completed',
                total: {
                    [Op.gt]: 0
                }
            }
        });

        const totalOrders = await Order.count({
            where: {
                total: {
                    [Op.gt]: 0
                }
            }
        });

        const totalCustomers = await Customer.count();

        const totalProducts = await Product.count();

        const currentYear = new Date().getFullYear();
        const revenueByMonth = await Order.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('created_at'), '%m'), 'month'],
                [fn('SUM', col('total')), 'total_revenue']
            ],
            where: {
                status: 'completed',
                total: {
                    [Op.gt]: 0
                },
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

        const ordersByMonth = await Order.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('created_at'), '%m'), 'month'],
                [fn('COUNT', '*'), 'total_orders']
            ],
            where: {
                total: {
                    [Op.gt]: 0
                },
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

        // Thống kê nhập xuất kho theo tháng
        const inventoryByMonth = await OrderItem.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('created_at'), '%m'), 'month'],
                [fn('SUM', col('quantity')), 'total_quantity']
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

        // Thống kê khách hàng
        const newCustomers = await Customer.count({
            where: {
                created_at: {
                    [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
                }
            }
        });

        const loyalCustomers = await Customer.count({
            include: [{
                model: Order,
                as: 'orders',
                required: true,
                attributes: []
            }],
            having: db.sequelize.literal('COUNT(orders.id) >= 5')
        });

        const potentialCustomers = await Customer.count({
            include: [{
                model: Order,
                as: 'orders',
                required: true,
                attributes: []
            }],
            having: db.sequelize.literal('COUNT(orders.id) < 5')
        });

        // Format customer data
        const customerData = {
            new: newCustomers,
            loyal: loyalCustomers,
            potential: potentialCustomers
        };

        const recentOrders = await Order.findAll({
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name', 'phone', 'email'],
                    required: false
                },
                {
                    model: Staff,
                    as: 'staff',
                    attributes: ['id', 'name', 'email'],
                    required: true
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price']
                    }]
                }
            ],
            where: {
                deleted_at: null,
                total: {
                    [Op.gt]: 0
                }
            },
            order: [['created_at', 'DESC']],
            limit: 10
        });

        // Format order data to include more details
        const formattedOrders = recentOrders.map(order => ({
            id: order.id,
            order_number: order.order_number,
            created_at: order.created_at,
            status: order.status,
            payment_method: order.payment_method,
            payment_status: order.payment_status || 'pending',
            subtotal: parseFloat(order.subtotal) || 0,
            discount: parseFloat(order.discount) || 0,
            tax: parseFloat(order.tax) || 0,
            total_amount: parseFloat(order.total) || 0,
            customer: order.customer ? {
                id: order.customer.id,
                name: order.customer.name || 'Khách lẻ',
                phone: order.customer.phone || 'Không có',
                email: order.customer.email || 'Không có'
            } : {
                id: null,
                name: 'Khách lẻ',
                phone: 'Không có',
                email: 'Không có'
            },
            staff: {
                id: order.staff.id,
                name: order.staff.name,
                email: order.staff.email
            },
            items: order.items.map(item => ({
                product_name: item.product.name,
                quantity: item.quantity,
                price: parseFloat(item.price) || 0,
                subtotal: (item.quantity * (parseFloat(item.price) || 0))
            }))
        }));

        const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

        // Format inventory data
        const inventoryData = {
            imports: months.map(month => {
                const data = inventoryByMonth.find(item => item.dataValues.month === month);
                return data ? Number(data.dataValues.total_quantity) || 0 : 0;
            }),
            exports: months.map(month => {
                const data = inventoryByMonth.find(item => item.dataValues.month === month);
                return data ? Number(data.dataValues.total_quantity) || 0 : 0;
            })
        };

        const chartData = {
            revenue: months.map(month => {
                const data = revenueByMonth.find(item => item.dataValues.month === month);
                return data ? Number(data.dataValues.total_revenue) : 0;
            }),
            orders: months.map(month => {
                const data = ordersByMonth.find(item => item.dataValues.month === month);
                return data ? Number(data.dataValues.total_orders) : 0;
            }),
            inventory: inventoryData,
            customers: customerData
        };

        const dashboardData = {
            totalRevenue: totalRevenue || 0,
            totalOrders,
            totalCustomers,
            totalProducts,
            recentOrders: formattedOrders,
            chartData
        };

        await cacheService.set(CACHE_KEYS.DASHBOARD, dashboardData, CACHE_TTL);

        res.json(dashboardData);
    } catch (error) {
        console.error('Error in getDashboardData:', error);
        res.status(500).json({
            message: 'Lỗi khi lấy dữ liệu dashboard',
            error: error.message
        });
    }
};
