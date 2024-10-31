// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // This makes the id a primary key
    autoIncrement: true // Automatically increments the ID for new categories
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // This field cannot be null
    unique: true // Ensures that category names are unique
  }
}, {
  tableName: 'Categories' // Specifies the name of the table in the database
});

module.exports = Category;
