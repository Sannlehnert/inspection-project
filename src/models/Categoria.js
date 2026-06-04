const { DataTypes } = require('sequelize');
const sequelize = require('../config/basededatos');

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'categoria',
  timestamps: false
});

module.exports = Categoria;