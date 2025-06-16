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
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'stock_movement_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    StockMovementItem.associate = function (models) {
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