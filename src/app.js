const express = require('express');

const app = express();

// Middlewares básicos para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba para ver que el servidor está vivo
app.get('/', (req, res) => {
  res.send('Servidor de inspecciones funcionando');
});

// Middleware de manejo de errores (básico)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

module.exports = app;