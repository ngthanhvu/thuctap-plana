module.exports = (sequelize, DataTypes) => {
    const Pos_session = sequelize.define('Pos_session', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        staff_id: { type: DataTypes.INTEGER, allowNull: false },
        opened_at: { type: DataTypes.DATE },
        closed_at: { type: DataTypes.DATE },
        status: { type: DataTypes.STRING },
        note: { type: DataTypes.TEXT },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'pos_sessions',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Pos_session;
};
