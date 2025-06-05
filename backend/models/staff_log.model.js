module.exports = (sequelize, DataTypes) => {
    const Staff_log = sequelize.define("staff_log", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        staff_id: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    });

    return Staff_log;
    
}