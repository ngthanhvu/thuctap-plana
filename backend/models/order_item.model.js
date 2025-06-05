module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        product_variant_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        discount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'order_items',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return OrderItem;
}