module.exports = (sequelize, DataTypes) => {
    const StockMovement = sequelize.define('StockMovement', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['import', 'export']]
            }
        },
        reference: {
            type: DataTypes.STRING
        },
        staff_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'staffs',
                key: 'id'
            }
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'stock_movements',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    StockMovement.associate = function (models) {
        StockMovement.belongsTo(models.Staff, {
            foreignKey: 'staff_id',
            as: 'creator'
        });
        StockMovement.hasMany(models.StockMovementItem, {
            foreignKey: 'stock_movement_id',
            as: 'items'
        });
    };

    return StockMovement;
};