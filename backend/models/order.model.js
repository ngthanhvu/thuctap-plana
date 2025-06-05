module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
      customer_id: { type: DataTypes.INTEGER, allowNull: true, },
      order_status_id: { type: DataTypes.INTEGER, allowNull: false, },
      pos_session_id: {  type: DataTypes.INTEGER,  allowNull: true, },
      pos_register_id: { type: DataTypes.INTEGER, allowNull: true, },
      staff_id: { type: DataTypes.INTEGER, allowNull: false, },
      total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, },
      shipping_fee: { type: DataTypes.DECIMAL(10, 2),  allowNull: true,  },
      payment_method: {  type: DataTypes.STRING, allowNull: true,  },
      note: { type: DataTypes.TEXT, allowNull: true, },
      created_at: {  type: DataTypes.DATE,  allowNull: false, },
      updated_at: { type: DataTypes.DATE, allowNull: false, },
    },
    {
      tableName: "orders",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Order;
};
