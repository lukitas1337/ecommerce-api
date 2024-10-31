const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');

// User to Order association
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Category to Product association
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Note: No direct association between Order and Product, as we will handle products within the Order model itself.
