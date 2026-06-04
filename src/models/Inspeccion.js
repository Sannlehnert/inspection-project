const { DataTypes } = require('sequelize');
const sequelize = require('../config/basededatos');

const Inspeccion = sequelize.define('Inspeccion', {
  id_inspeccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresa',
      key: 'id_empresa'
    }
  },
  id_formulario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'formulario',
      key: 'id_formulario'
    }
  }
}, {
  tableName: 'inspeccion',
  timestamps: false
});

module.exports = Inspeccion;