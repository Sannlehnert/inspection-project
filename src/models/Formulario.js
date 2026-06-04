const { DataTypes } = require('sequelize');
const sequelize = require('../config/basededatos');

const Formulario = sequelize.define('Formulario', {
  id_formulario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  revision: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'formulario',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['nombre', 'revision']
    }
  ]
});

module.exports = Formulario;