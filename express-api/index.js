const express = require('express');
const sequelize = require('./db');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter'); 
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');

// Import models and associations
require('./models/associations'); // This sets up the associations

const app = express();
app.use(express.json());

// Define routes
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// Sync the database models
sequelize.sync({ alter: true }) // Use { alter: true } for development to update the schema without dropping tables
  .then(() => console.log('Database synced'))
  .catch(err => {
    console.error('Error syncing database:', err.message);
    console.error(err);
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
