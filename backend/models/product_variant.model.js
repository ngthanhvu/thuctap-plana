module.exports = (sequelize, DataTypes) => {
    const ProductVariant = sequelize.define("product_variant", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_id: { type: DataTypes.INTEGER },
        sku: { type: DataTypes.STRING },
        color: { type: DataTypes.STRING },
        size: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER },
        cost: { type: DataTypes.INTEGER },
        barcode: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'product_variants',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return ProductVariant;
}