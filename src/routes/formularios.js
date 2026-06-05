// src/routes/formularios.js

const express = require('express');
const router = express.Router();
const formulariosController = require('../controllers/formulariosController');
const validarFormulario = require('../middlewares/validarFormulario');

// Crear formulario
router.post('/', validarFormulario, formulariosController.crearFormulario);

// Listar todos
router.get('/', formulariosController.listarFormularios);

// Obtener uno por ID
router.get('/:id', formulariosController.obtenerFormulario);

module.exports = router;