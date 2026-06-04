const Empresa = require('./Empresa');
const Formulario = require('./Formulario');
const Categoria = require('./Categoria');
const Pregunta = require('./Pregunta');
const Inspeccion = require('./Inspeccion');
const Respuesta = require('./Respuesta');

// Formulario - Categoria
Formulario.hasMany(Categoria, { foreignKey: 'id_formulario' });
Categoria.belongsTo(Formulario, { foreignKey: 'id_formulario' });

// Categoria - Pregunta
Categoria.hasMany(Pregunta, { foreignKey: 'id_categoria' });
Pregunta.belongsTo(Categoria, { foreignKey: 'id_categoria' });

// Empresa - Inspeccion
Empresa.hasMany(Inspeccion, { foreignKey: 'id_empresa' });
Inspeccion.belongsTo(Empresa, { foreignKey: 'id_empresa' });

// Formulario - Inspeccion
Formulario.hasMany(Inspeccion, { foreignKey: 'id_formulario' });
Inspeccion.belongsTo(Formulario, { foreignKey: 'id_formulario' });

// Inspeccion - Respuesta
Inspeccion.hasMany(Respuesta, { foreignKey: 'id_inspeccion' });
Respuesta.belongsTo(Inspeccion, { foreignKey: 'id_inspeccion' });

// Pregunta - Respuesta
Pregunta.hasMany(Respuesta, { foreignKey: 'id_pregunta' });
Respuesta.belongsTo(Pregunta, { foreignKey: 'id_pregunta' });

module.exports = {
  Empresa,
  Formulario,
  Categoria,
  Pregunta,
  Inspeccion,
  Respuesta
};