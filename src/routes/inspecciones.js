const express = require('express');
const router = express.Router();
const inspeccionesController = require('../controllers/inspeccionesController');
const validarInspeccion = require('../middlewares/validarInspeccion');

router.post('/', validarInspeccion, inspeccionesController.crearInspeccion);
router.get('/:id', inspeccionesController.obtenerInspeccion);

module.exports = router;