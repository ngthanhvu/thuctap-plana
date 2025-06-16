module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        staff_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'staffs',
                key: 'id'
            }
        },
        pos_session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pos_sessions',
                key: 'id'
            }
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        tax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['cash', 'card']]
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'completed',
            validate: {
                isIn: [['pending', 'completed', 'cancelled']]
            }
        },
        payment_status: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    Order.associate = function (models) {
        Order.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer'
        });
        Order.belongsTo(models.Staff, {
            foreignKey: 'staff_id',
            as: 'staff'
        });
        Order.belongsTo(models.PosSession, {
            foreignKey: 'pos_session_id',
            as: 'posSession'
        });
        Order.hasMany(models.OrderItem, {
            foreignKey: 'order_id',
            as: 'items'
        });
    };

    return Order;
};