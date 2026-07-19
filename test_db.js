const pool = require('./db');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("¡Conexión exitosa! La fecha de la base de datos es:", res.rows[0].now);
  } catch (err) {
    console.error("Error al conectar:", err.message);
  }
}

testConnection();