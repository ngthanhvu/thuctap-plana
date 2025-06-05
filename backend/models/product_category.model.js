module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'categories',
        timestamps: false
    });

    Category.associate = (models) => {
        Category.belongsTo(Category, {
            as: 'parent',
            foreignKey: 'parent_id'
        });
        
        Category.hasMany(Category, {
            as: 'children',
            foreignKey: 'parent_id'
        });
    };

    return Category;
};