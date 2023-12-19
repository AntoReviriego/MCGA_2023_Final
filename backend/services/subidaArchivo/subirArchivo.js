const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ruta donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    const { carrera, resolucion } = req.body;
    let nombreArchivo = "";
    if(carrera != null && carrera != undefined){
      nombreArchivo = `${carrera.replace(/\s/g, '_')}_${resolucion.replace(/\s/g, '_')}_${Date.now()}_${file.originalname}`;
    }
    else{
      nombreArchivo = `_${Date.now()}_${file.originalname}`;
    }

    cb(null, nombreArchivo); // Nombre de archivo combinado único
  },
});

const subida = multer({ storage: storage });

module.exports = { subida };
