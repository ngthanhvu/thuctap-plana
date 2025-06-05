module.exports = (sequelize, DataTypes) => {
    const Stock_movement = sequelize.define('Stock_movement', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING }, // varchar
        from_warehouse_id: { type: DataTypes.INTEGER, allowNull: true },
        to_warehouse_id: { type: DataTypes.INTEGER, allowNull: true },
        created_by: { type: DataTypes.INTEGER },
        note: { type: DataTypes.TEXT },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'stock_movements',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Stock_movement;
};
