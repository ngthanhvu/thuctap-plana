module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        parent_id: { type: DataTypes.INTEGER, allowNull: true }, // Cho phép null
        status: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Category;
};
