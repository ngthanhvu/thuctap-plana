module.exports = (sequelize, DataTypes) => {
    const CustomerPoint = sequelize.define('CustomerPoint', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['earned', 'redeemed']]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'customer_points',
        timestamps: false
    });

    CustomerPoint.associate = function(models) {
        CustomerPoint.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer'
        });
        CustomerPoint.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order'
        });
    };

    return CustomerPoint;
};