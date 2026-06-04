const { DataTypes } = require('sequelize');
const sequelize = require('../config/basededatos');

const Pregunta = sequelize.define('Pregunta', {
  id_pregunta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  texto: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categoria',
      key: 'id_categoria'
    }
  }
}, {
  tableName: 'pregunta',
  timestamps: false
});

module.exports = Pregunta;