module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("customer", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        group_id: { type: DataTypes.INTEGER, allowNull: true },
        note: { type: DataTypes.TEXT, allowNull: true },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'customers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Customer;
};
