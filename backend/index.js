require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, cantidad, precio FROM productos ORDER BY id ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar productos:', error);
    res.status(500).json({
      message: 'Error al obtener productos',
      error: error.message,
    });
  }
});

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS server_time');
    res.json({ ok: true, server_time: result.rows[0].server_time });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API lista en http://localhost:${port}`);
  });
}

module.exports = app;