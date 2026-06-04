const { Sequelize } = require('sequelize');

// Cargar variables de entorno (se hace en server.js antes de importar, pero por las dudas)
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,  // para que no tire SQL por consola todo el tiempo
  }
);

module.exports = sequelize;