module.exports = (sequelize, DataTypes) => {
    const PosSession = sequelize.define('PosSession', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        staff_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'staffs',
                key: 'id'
            }
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'active',
            validate: {
                isIn: [['active', 'closed']]
            }
        },
        opening_cash: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        closing_cash: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
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
        tableName: 'pos_sessions',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    PosSession.associate = function (models) {
        PosSession.belongsTo(models.Staff, {
            foreignKey: 'staff_id',
            as: 'staff'
        });
        PosSession.hasMany(models.Order, {
            foreignKey: 'pos_session_id',
            as: 'orders'
        });
    };

    return PosSession;
};