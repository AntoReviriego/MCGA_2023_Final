const path = require('path');
const fs = require('fs');
const getDescargaArchivos = async (req, res) => {
  try {
    const filename = req.params.url;
    const filePath = path.join('./uploads', filename); // Modifica la ruta según la estructura de tu proyecto
    const existeArchivo = fs.existsSync(filePath);
    if (!existeArchivo) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    res.download(filePath, filename, (error) => {
      if (error) {
        console.error('Error al descargar el archivo:', error);
        return res.status(500).json({ error: 'Error al descargar el archivo' +  filePath});
      }
    });
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    res.status(500).json({ error: 'Error al descargar el archivo' });
  }
};
const getVerImg = async (req, res) => {
  try {
    const filename = req.params.url;
    const filePath = path.resolve('./uploads', filename); // Convierte la ruta a absoluta
    const existeArchivo = fs.existsSync(filePath);
    if (!existeArchivo) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    res.sendFile(filePath); // Envía la imagen como respuesta
  } catch (error) {
    // console.error('Error al obtener la imagen:', error);
    // console.error('Ruta del archivo:', filePath);
    // console.error('Nombre del archivo:', filename);
    // console.error('Stack Trace:', error.stack);
    res.status(500).json({ error: 'Error al obtener la imagen' });
  }
};
module.exports = {
  getDescargaArchivos, 
  getVerImg
};