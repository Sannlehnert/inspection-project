const { DataTypes } = require('sequelize');
const sequelize = require('../config/basededatos');

const Empresa = sequelize.define('Empresa', {
  id_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'empresa',
  timestamps: false
});

module.exports = Empresa;