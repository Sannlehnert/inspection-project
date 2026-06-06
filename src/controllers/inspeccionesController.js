const { Inspeccion, Empresa, Formulario, Categoria, Pregunta, Respuesta } = require('../models');
const sequelize = require('../config/basededatos');

// POST /inspecciones
const crearInspeccion = async (req, res) => {
  const { id_empresa, id_formulario, fecha, respuestas } = req.body;

  // Validamos existencia de empresa y formulario
  try {
    const empresa = await Empresa.findByPk(id_empresa);
    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada.' });
    }

    const formulario = await Formulario.findByPk(id_formulario);
    if (!formulario) {
      return res.status(404).json({ mensaje: 'Formulario no encontrado.' });
    }

    // Obtener todas las preguntas del formulario
    const preguntasFormulario = await Pregunta.findAll({
      include: {
        model: Categoria,
        where: { id_formulario },
        attributes: [] // solo necesitamos la relación
      }
    });

    const idsPreguntasFormulario = preguntasFormulario.map(p => p.id_pregunta);
    const idsPreguntasEnviadas = respuestas.map(r => r.id_pregunta);

    // Verificar que se respondieron exactamente todas las preguntas del formulario
    if (idsPreguntasEnviadas.length !== idsPreguntasFormulario.length) {
      return res.status(400).json({
        mensaje: 'Debe responder todas las preguntas del formulario.'
      });
    }

    // Verificar que todas las preguntas enviadas pertenezcan al formulario
    for (const id of idsPreguntasEnviadas) {
      if (!idsPreguntasFormulario.includes(id)) {
        return res.status(400).json({
          mensaje: `La pregunta con id ${id} no pertenece al formulario indicado.`
        });
      }
    }

    // Crear inspección y respuestas en una transacción
    const t = await sequelize.transaction();

    try {
      const nuevaInspeccion = await Inspeccion.create({
        fecha: fecha || new Date(),
        id_empresa,
        id_formulario
      }, { transaction: t });

      const respuestasParaInsertar = respuestas.map(r => ({
        respuesta: r.respuesta,
        id_pregunta: r.id_pregunta,
        id_inspeccion: nuevaInspeccion.id_inspeccion
      }));

      await Respuesta.bulkCreate(respuestasParaInsertar, { transaction: t });

      await t.commit();

      // Devolver la inspección creada con datos completos
      const inspeccionCompleta = await Inspeccion.findByPk(nuevaInspeccion.id_inspeccion, {
        include: [
          { model: Empresa },
          {
            model: Formulario,
            include: {
              model: Categoria,
              include: { model: Pregunta }
            }
          },
          {
            model: Respuesta,
            include: { model: Pregunta }
          }
        ],
        order: [
          [Formulario, Categoria, 'orden', 'ASC'],
          [Formulario, Categoria, Pregunta, 'orden', 'ASC'],
          [Respuesta, Pregunta, 'orden', 'ASC']
        ]
      });

      return res.status(201).json(inspeccionCompleta);

    } catch (error) {
      await t.rollback();

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ mensaje: 'Ya existe una respuesta duplicada para esta inspección.' });
      }

      console.error(error);
      return res.status(500).json({ mensaje: 'Error al registrar la inspección.' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al verificar los datos de la inspección.' });
  }
};

// GET /inspecciones/:id
const obtenerInspeccion = async (req, res) => {
  const { id } = req.params;

  try {
    const inspeccion = await Inspeccion.findByPk(id, {
      include: [
        { model: Empresa },
        {
          model: Formulario,
          include: {
            model: Categoria,
            include: { model: Pregunta }
          }
        },
        {
          model: Respuesta,
          include: { model: Pregunta }
        }
      ],
      order: [
        [Formulario, Categoria, 'orden', 'ASC'],
        [Formulario, Categoria, Pregunta, 'orden', 'ASC'],
        [Respuesta, Pregunta, 'orden', 'ASC']
      ]
    });

    if (!inspeccion) {
      return res.status(404).json({ mensaje: 'Inspección no encontrada.' });
    }

    return res.json(inspeccion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener la inspección.' });
  }
};

module.exports = {
  crearInspeccion,
  obtenerInspeccion
};