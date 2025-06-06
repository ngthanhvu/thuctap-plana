module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role_id: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    });
    return User;
}