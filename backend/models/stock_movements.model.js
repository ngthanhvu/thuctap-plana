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
        created_by: {
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
        }
    }, {
        tableName: 'stock_movements',
        timestamps: false
    });

    StockMovement.associate = function(models) {
        StockMovement.belongsTo(models.Staff, {
            foreignKey: 'created_by',
            as: 'creator'
        });
        StockMovement.hasMany(models.StockMovementItem, {
            foreignKey: 'stock_movement_id',
            as: 'items'
        });
    };

    return StockMovement;
};