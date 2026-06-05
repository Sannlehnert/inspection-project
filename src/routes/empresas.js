const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');
const validarEmpresa = require('../middlewares/validarEmpresa');

router.post('/', validarEmpresa, empresasController.crearEmpresa);
router.get('/', empresasController.listarEmpresas);

module.exports = router;