const express = require('express');
const sequelize = require('./db');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter'); 
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');

const User = require('./models/User'); 
const Category = require('./models/Category'); 
const Product = require('./models/Product');
const Order = require('./models/Order');


const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);




// Sync the database models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
