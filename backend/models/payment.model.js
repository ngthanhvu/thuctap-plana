module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("payment", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        payment_method: { type: DataTypes.STRING, allowNull: false},
        paid_at: { type: DataTypes.DATE, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'payments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Payment;
};
