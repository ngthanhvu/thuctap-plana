module.exports = (sequelize, DataTypes) => {
    const Stock_movement_item = sequelize.define('Stock_movement_item', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        stock_movement_id: { type: DataTypes.INTEGER },
        product_variant_id: { type: DataTypes.INTEGER },
        quantity: { type: DataTypes.INTEGER },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'stock_movement_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Stock_movement_item;
}