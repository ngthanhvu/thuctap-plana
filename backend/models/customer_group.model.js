module.exports = (sequelize, DataTypes) => {
    const Customer_groups = sequelize.define("customer_groups", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    });

    return Customer_groups;
}