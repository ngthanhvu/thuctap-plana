module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'customers',
        timestamps: false
    });

    Customer.associate = function(models) {
        Customer.hasMany(models.Order, {
            foreignKey: 'customer_id',
            as: 'orders'
        });
        Customer.hasMany(models.CustomerPoint, {
            foreignKey: 'customer_id',
            as: 'pointHistory'
        });
    };

    return Customer;
};