const express = require('express');
const router = express.Router();
const respuestasController = require('../controllers/respuestasController');
const subir = require('../middlewares/subirImagen');

// Subir imagen a una respuesta
router.post('/:id/imagen', subir.single('imagen'), respuestasController.subirImagen);

module.exports = router;