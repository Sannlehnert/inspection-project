const { Respuesta } = require('../models');

// POST /respuestas/:id/imagen
const subirImagen = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la respuesta
    const respuesta = await Respuesta.findByPk(id);
    if (!respuesta) {
      return res.status(404).json({ mensaje: 'Respuesta no encontrada.' });
    }

    // Verificar que Multer haya guardado el archivo
    if (!req.file) {
      return res.status(400).json({ mensaje: 'Debe enviar una imagen.' });
    }

    // Actualizar el campo imagen con el nombre del archivo
    respuesta.imagen = req.file.filename;
    await respuesta.save();

    return res.json({
      mensaje: 'Imagen cargada correctamente.',
      respuesta: {
        id_respuesta: respuesta.id_respuesta,
        imagen: respuesta.imagen,
        id_pregunta: respuesta.id_pregunta,
        id_inspeccion: respuesta.id_inspeccion,
        respuesta: respuesta.respuesta
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al cargar la imagen.' });
  }
};

module.exports = {
  subirImagen
};