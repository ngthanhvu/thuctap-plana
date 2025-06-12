module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'inventories',
        timestamps: false
    });

    Inventory.associate = function(models) {
        Inventory.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });
    };

    return Inventory;
};