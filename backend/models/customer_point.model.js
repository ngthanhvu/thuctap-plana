module.exports = (sequelize, DataTypes) => {
     const Customer_point = sequelize.define("customer_point", {
          id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
          customer_id: { type: DataTypes.INTEGER, allowNull: false },
          point: { type: DataTypes.INTEGER, allowNull: false },
          level: { type: DataTypes.INTEGER, allowNull: false },
          created_at: { type: DataTypes.DATE },
          updated_at: { type: DataTypes.DATE }
     });

     return Customer_point;
};