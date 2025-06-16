module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        brand_id: {
            type: DataTypes.INTEGER,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
            comment: 'ảnh sản phẩm chính'
        },
        sku: {
            type: DataTypes.STRING,
            unique: true,
            comment: 'mã SKU duy nhất'
        },
        barcode: {
            type: DataTypes.STRING,
            comment: 'mã vạch sản phẩm'
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            comment: 'giá bán'
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            comment: 'giá vốn'
        },
        status: {
            type: DataTypes.STRING
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
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    return Product;
};
