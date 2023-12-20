const multer = require('multer');
const fs = require('fs'); // Módulo FileSystem de Node.js
const borrarArchivo = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Borra el archivo si existe
      console.log(`Archivo borrado: ${filePath}`);
    } else {
      console.log(`El archivo no existe en la ruta: ${filePath}`);
    }
  } catch (error) {
    console.error('Error al borrar el archivo:', error);
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = 'uploads/';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });    // Verificar si la carpeta existe, si no, la crea
    }
    cb(null, folder); // Ruta donde se guardarán los archivos subidos//   
  },
  filename: function (req, file, cb) {
    const { carrera, resolucion } = req.body;
    let nombreArchivo = "";
    if (carrera != null && carrera != undefined) {
      nombreArchivo = `${carrera.replace(/\s/g, '_')}_${resolucion.replace(/\s/g, '_')}_${Date.now()}_${file.originalname}`;
    } else {
      nombreArchivo = `_${Date.now()}_${file.originalname}`;
    }
    cb(null, nombreArchivo); // Nombre de archivo combinado único
  },
});
const subida = multer({ storage: storage });
module.exports = { subida, borrarArchivo };
