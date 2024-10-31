const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');

// User to Order association
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order to Product association (1-to-many)
Order.hasMany(Product, { foreignKey: 'orderId' }); // This implies each product can belong to one order
Product.belongsTo(Order, { foreignKey: 'orderId' }); // This is used if you want to track which order a product belongs to

// Category to Product association
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
