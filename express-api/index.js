const express = require('express');
const sequelize = require('./db');
const userRouter = require('./routers/userRouter'); 

const app = express();
app.use(express.json()); 

app.use('/users', userRouter);

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
