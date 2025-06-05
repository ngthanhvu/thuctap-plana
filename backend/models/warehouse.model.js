module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define("warehouse", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        location: { type: DataTypes.STRING },
        manager_id: { type: DataTypes.INTEGER },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'warehouses', // tên bảng trong DB
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Warehouse;
};
