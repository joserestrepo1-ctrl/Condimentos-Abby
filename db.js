require('dotenv').config(); // Asegúrate de tener esta línea al principio para que lea el archivo .env
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'abby_db',
  password: process.env.DB_PASSWORD, // Sin comillas
  port: 5432,
});

module.exports = pool;