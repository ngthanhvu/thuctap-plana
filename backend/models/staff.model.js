module.exports = (sequelize, DataTypes) => {
    const Staffs = sequelize.define('Staffs', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE },
    }, {
        tableName: 'staffs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Staffs;
};