const { Empresa } = require('../models');

// POST /empresas
const crearEmpresa = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevaEmpresa = await Empresa.create({ nombre: nombre.trim() });
    return res.status(201).json(nuevaEmpresa);
  } catch (error) {
    // Nombre duplicado (restricción UNIQUE en la base de datos)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ mensaje: 'Ya existe una empresa con ese nombre.' });
    }

    console.error(error);
    return res.status(500).json({ mensaje: 'Error al crear la empresa.' });
  }
};

// GET /empresas
const listarEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll({
      order: [['nombre', 'ASC']]
    });
    return res.json(empresas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener las empresas.' });
  }
};

module.exports = {
  crearEmpresa,
  listarEmpresas
};