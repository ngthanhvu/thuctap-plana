module.exports = (sequelize, DataTypes) => {
    const StockMovementItem = sequelize.define('StockMovementItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stock_movement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'stock_movements',
                key: 'id'
            }
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
            allowNull: false
        }
    }, {
        tableName: 'stock_movement_items',
        timestamps: false
    });

    StockMovementItem.associate = function(models) {
        StockMovementItem.belongsTo(models.StockMovement, {
            foreignKey: 'stock_movement_id',
            as: 'stockMovement'
        });
        StockMovementItem.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });
    };

    return StockMovementItem;
};