const Noticia = require('./noticia.model');

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
  
};

const patchNoticia = async (req, res) => {
  
};

const deleteNoticia = async (req, res) => {
 
};


module.exports = {
    getNoticia,
    getNoticiaById,
    postNoticia,
    patchNoticia, 
    deleteNoticia
};
