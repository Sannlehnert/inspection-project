function validarInspeccion(req, res, next) {
  const { id_empresa, id_formulario, respuestas } = req.body;

  if (!id_empresa || !id_formulario) {
    return res.status(400).json({ mensaje: 'Debe proporcionar id_empresa e id_formulario.' });
  }

  if (!Array.isArray(respuestas) || respuestas.length === 0) {
    return res.status(400).json({ mensaje: 'Debe enviar al menos una respuesta.' });
  }

  const idsPreguntas = [];
  const valoresPermitidos = ['Cumple', 'No cumple', 'N/A'];

  for (let i = 0; i < respuestas.length; i++) {
    const r = respuestas[i];

    if (!r.id_pregunta || !r.respuesta) {
      return res.status(400).json({
        mensaje: `La respuesta en posición ${i} debe tener id_pregunta y respuesta.`
      });
    }

    if (!valoresPermitidos.includes(r.respuesta)) {
      return res.status(400).json({
        mensaje: `La respuesta en posición ${i} no es válida. Use: Cumple, No cumple o N/A.`
      });
    }

    if (idsPreguntas.includes(r.id_pregunta)) {
      return res.status(400).json({
        mensaje: `La pregunta con id ${r.id_pregunta} está repetida en las respuestas.`
      });
    }

    idsPreguntas.push(r.id_pregunta);
  }

  next();
}

module.exports = validarInspeccion;