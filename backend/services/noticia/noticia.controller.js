const Noticia = require('./noticia.model');
const { subida, borrarArchivo} = require('../subidaArchivo/subirArchivo');
const path = require('path');
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
      return res.status(500).json({ error: 'Error al subir la imagen', err });
    }
    try {
      const newNoticia = new Noticia({
        titulo: req.body.titulo,
        cuerpo: req.body.cuerpo,
        autor: req.body.autor,
        id_carrera: req.body.id_carrera,
        creado: Date.now(),
        actualizado: Date.now(),
        img: req.file ? req.file.path.split('/').pop() : null, // Guardar la ruta del archivo si existe
      });
      const savedNoticia = await newNoticia.save();
      res.status(201).json(savedNoticia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al guardar la noticia' });
    }  
  });
};
const patchNoticia = async (req, res) => {
  try {
    const  id  = req.params.id
    subida.single('img')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al subir la imagen', err });
      }
      try {
        const {titulo, cuerpo, id_carrera} = req.body;
        const noticiaUpdate = await Noticia.findByIdAndUpdate(id, { 
          titulo: titulo, 
          cuerpo: cuerpo,
          id_carrera: id_carrera,
          img: req.file ? req.file.path.split('/').pop() : null,
          actualizado: Date.now()
        });
        res.status(200).json(noticiaUpdate); // Devuelve el documento guardado como respuesta
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la noticia' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar la noticia' }); // Manejo de errores
  }
};
const deleteNoticia = async (req, res) => {
  try {
    const noticiaId = req.params.id; // Suponiendo que el ID está en los parámetros de la solicitud
    const deletedNoticia = await Noticia.findByIdAndDelete(noticiaId);
    if (!deletedNoticia) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    // Obtener el nombre del archivo asociado a la noticia
    const fileName = deletedNoticia.img;
    if (fileName) {
      const filePath = path.join(fileName); // Ruta del archivo a borrar
      borrarArchivo(filePath); // Utilizar la función borrarArchivo para eliminar el archivo asociado
    }
    res.status(200).json({ message: 'Noticia eliminada exitosamente', deletedNoticia });
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
