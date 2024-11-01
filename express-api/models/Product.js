const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', 
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Product',
});

module.exports = Product;
