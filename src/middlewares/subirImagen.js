const multer = require('multer');
const path = require('path');

// Configurar almacenamiento
const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1000);
    const extension = path.extname(file.originalname);
    cb(null, nombreUnico + extension);
  }
});

// Filtrar solo imágenes
const filtroImagen = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|gif|webp/;
  const extension = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const tipoMime = tiposPermitidos.test(file.mimetype);

  if (extension && tipoMime) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp).'), false);
  }
};

const subir = multer({
  storage: almacenamiento,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: filtroImagen
});

module.exports = subir;