module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("inventory", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_variant_id: { type: DataTypes.INTEGER },
        warehouse_id: { type: DataTypes.INTEGER },
        quantity: { type: DataTypes.INTEGER },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    });

    return Inventory;
}