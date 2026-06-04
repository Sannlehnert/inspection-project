const { DataTypes } = require('sequelize');
const sequelize = require('../config/basededatos');

const Respuesta = sequelize.define('Respuesta', {
  id_respuesta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  respuesta: {
    type: DataTypes.ENUM('Cumple', 'No cumple', 'N/A'),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  id_pregunta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pregunta',
      key: 'id_pregunta'
    }
  },
  id_inspeccion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'inspeccion',
      key: 'id_inspeccion'
    }
  }
}, {
  tableName: 'respuesta',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id_inspeccion', 'id_pregunta']
    }
  ]
});

module.exports = Respuesta;