module.exports = (sequelize, DataTypes) => {
    const SalesReport = sequelize.define('SalesReport', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pos_session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pos_sessions',
                key: 'id'
            }
        },
        total_cash_sales: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        total_card_sales: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        total_orders: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'sales_reports',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    SalesReport.associate = function (models) {
        SalesReport.belongsTo(models.PosSession, {
            foreignKey: 'pos_session_id',
            as: 'posSession'
        });
    };

    return SalesReport;
};