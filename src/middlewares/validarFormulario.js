function validarFormulario(req, res, next) {
  const { nombre, revision, categorias } = req.body;

  // Nombre y revisión obligatorios
  if (!nombre || !revision) {
    return res.status(400).json({ mensaje: 'El nombre y la revisión son obligatorios.' });
  }

  // La revisión debe ser un número entero positivo
  if (!Number.isInteger(revision) || revision <= 0) {
    return res.status(400).json({ mensaje: 'La revisión debe ser un número entero positivo.' });
  }

  // Debe haber al menos una categoría
  if (!Array.isArray(categorias) || categorias.length === 0) {
    return res.status(400).json({ mensaje: 'Debe incluir al menos una categoría.' });
  }

  for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];

    if (!cat.titulo || !cat.orden) {
      return res.status(400).json({
        mensaje: `La categoría en posición ${i} debe tener título y orden.`
      });
    }

    if (!Array.isArray(cat.preguntas) || cat.preguntas.length === 0) {
      return res.status(400).json({
        mensaje: `La categoría "${cat.titulo}" debe tener al menos una pregunta.`
      });
    }

    for (let j = 0; j < cat.preguntas.length; j++) {
      const preg = cat.preguntas[j];
      if (!preg.texto || !preg.orden) {
        return res.status(400).json({
          mensaje: `La pregunta en posición ${j} de la categoría "${cat.titulo}" debe tener texto y orden.`
        });
      }
    }
  }

  next();
}

module.exports = validarFormulario;