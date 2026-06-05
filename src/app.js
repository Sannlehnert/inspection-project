const express = require('express');

const app = express();

const formulariosRouter = require('./routes/formularios');

const empresasRouter = require('./routes/empresas');

// Middlewares básicos para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/formularios', formulariosRouter);

app.use('/empresas', empresasRouter);

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