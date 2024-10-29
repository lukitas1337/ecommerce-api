// express-api/index.js
const express = require('express');
const sequelize = require('./db');
const userRouter = require('./routers/userRouter'); // Import the user router

const app = express();
app.use(express.json()); // Parse JSON requests

app.use('/users', userRouter); // Use /users route for user endpoints

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
