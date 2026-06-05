function validarEmpresa(req, res, next) {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ mensaje: 'El nombre de la empresa es obligatorio.' });
  }

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre de la empresa no puede estar vacío.' });
  }

  next();
}

module.exports = validarEmpresa;