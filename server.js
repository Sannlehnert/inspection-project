require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/basededatos');
const fs = require('fs');

const puerto = process.env.PORT || 3000;

// Probar conexión a la base de datos y luego levantar el servidor
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    app.listen(puerto, () => {
      console.log(`Servidor corriendo en puerto ${puerto}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
  }
}

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

iniciarServidor();