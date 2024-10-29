const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use the NEON connection string from .env
const sequelize = new Sequelize(process.env.NEON, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,              
      rejectUnauthorized: false   
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('Connected to Neon PostgreSQL database...'))
  .catch(err => console.log('Error connecting to database:', err));

module.exports = sequelize;
