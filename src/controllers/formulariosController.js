const { Formulario, Categoria, Pregunta } = require('../models');
const sequelize = require('../config/basededatos');

// POST /formularios
const crearFormulario = async (req, res) => {
  const { nombre, revision, categorias } = req.body;

  // Usamos una transacción para hacer todo atómico
  const t = await sequelize.transaction();

  try {
    // 1. Desactivar revisiones anteriores del mismo nombre
    await Formulario.update(
      { activo: false },
      {
        where: { nombre },
        transaction: t
      }
    );

    // 2. Crear el nuevo formulario junto con sus categorías y preguntas
    const nuevoFormulario = await Formulario.create(
      {
        nombre,
        revision,
        activo: true,
        Categoria: categorias.map(cat => ({
          titulo: cat.titulo,
          orden: cat.orden,
          Pregunta: cat.preguntas.map(preg => ({
            texto: preg.texto,
            orden: preg.orden
          }))
        }))
      },
      {
        include: [
          {
            model: Categoria,
            include: [Pregunta]
          }
        ],
        transaction: t
      }
    );

    await t.commit();

    // Buscamos el formulario recién creado con sus relaciones para devolverlo
    const formularioCompleto = await Formulario.findByPk(nuevoFormulario.id_formulario, {
      include: [
        {
          model: Categoria,
          include: [Pregunta]
        }
      ],
      order: [
        [Categoria, 'orden', 'ASC'],
        [Categoria, Pregunta, 'orden', 'ASC']
      ]
    });

    return res.status(201).json(formularioCompleto);

  } catch (error) {
    await t.rollback();

    // Si es un error de duplicado (UNIQUE)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        mensaje: 'Ya existe un formulario con ese nombre y número de revisión.'
      });
    }

    console.error(error);
    return res.status(500).json({ mensaje: 'Error al crear el formulario.' });
  }
};

// GET /formularios
const listarFormularios = async (req, res) => {
  try {
    const formularios = await Formulario.findAll({
      order: [
        ['nombre', 'ASC'],
        ['revision', 'ASC']
      ]
    });

    return res.json(formularios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener los formularios.' });
  }
};

// GET /formularios/:id
const obtenerFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const formulario = await Formulario.findByPk(id, {
      include: [
        {
          model: Categoria,
          include: [Pregunta]
        }
      ],
      order: [
        [Categoria, 'orden', 'ASC'],
        [Categoria, Pregunta, 'orden', 'ASC']
      ]
    });

    if (!formulario) {
      return res.status(404).json({ mensaje: 'Formulario no encontrado.' });
    }

    return res.json(formulario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener el formulario.' });
  }
};

module.exports = {
  crearFormulario,
  listarFormularios,
  obtenerFormulario
};