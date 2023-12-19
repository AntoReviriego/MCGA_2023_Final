const Noticia = require('./noticia.model');
const { subida } = require('../subidaArchivo/subirArchivo');

const getNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.find().populate('id_carrera'); // Utiliza findById para buscar por ID; 
    res.status(200).json(noticia); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las noticias' });
  }
};

const getNoticiaById = async (req, res) => {
  try {
    const id = req.params.id; // Acceder directamente al parámetro id
    const noticia = await Noticia.findById(id);
    res.status(200).json(noticia);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener la noticia' });
  }
};

const postNoticia = async (req, res) => {
  subida.single('img')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al subir el archivo', err });
    }
   
    // Logica de post
  });
};

const patchNoticia = async (req, res) => {
  try {
    const  id  = req.params.id
    subida.single('img')(req, res, async (err) => {
      // Logica de patch
  });
} catch (error) {
  res.status(500).json({ error: 'Error al editar la noticia' }); // Manejo de errores
}
};

const deleteNoticia = async (req, res) => {
  try {
    // logica delete 
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    res.status(500).json({ error: 'Error al eliminar la noticia' });
  }
};


module.exports = {
    getNoticia,
    getNoticiaById,
    postNoticia,
    patchNoticia, 
    deleteNoticia
};
