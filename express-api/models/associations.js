const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct'); // Import the OrderProduct model
const Category = require('./Category');

// User to Order association
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Product to Order association through OrderProduct
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });

// Category to Product association
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
