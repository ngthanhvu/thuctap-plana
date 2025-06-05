module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define("product_image", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_id: { type: DataTypes.INTEGER },
        variant_id: { type: DataTypes.INTEGER },
        url: { type: DataTypes.STRING },
        is_main: { type: DataTypes.BOOLEAN },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'product_images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return ProductImage;
};
