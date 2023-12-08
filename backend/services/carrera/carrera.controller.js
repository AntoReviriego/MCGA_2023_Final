const Carrera = require('./carrera.model');
const { subida } = require('../subidaArchivo/subirArchivo');

const getCarrer = async (req, res) => {
    try {
        const carrers = await Carrera.find(); // Utiliza await para esperar la resolución de la promesa
        res.status(200).json(carrers); // Envía los datos como respuesta en formato JSON
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las carreras' }); // Manejo de errores
    }
};

const getCarrerById = async (req, res) => {
    try {
        const id = req.params.id; // Acceder directamente al parámetro id
        const carrer = await Carrera.findById(id); // Utiliza findById para buscar por ID
        res.status(200).json(carrer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las carreras' });
    }
};

const postCarrer = async (req, res) => {
    subida.single('pdf')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error al subir el archivo', err });
        }
        try {
          const newCarrer = new Carrera({
            carrera: req.body.carrera,
            resolucion: req.body.resolucion,
            pdf: req.file ? req.file.path.split('/').pop() : null, // Guardar la ruta del archivo si existe
          });
          
          const savedCarrer = await newCarrer.save();
          res.status(201).json(savedCarrer);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Error al guardar la carrera' });
        }
    });
};

const patchCarrer = async (req, res) => {
    try {
        const  id  = req.params.id
        subida.single('pdf')(req, res, async (err) => {
          if (err) {
            return res.status(500).json({ error: 'Error al subir el archivo', err });
          }
          try {
            const {carrera, resolucion} = req.body;
            const carreraUpdate = await Carrera.findByIdAndUpdate(id, { 
              carrera: carrera, 
              resolucion: resolucion,
              pdf: req.file ? req.file.path.split('/').pop() : null,
              actualizado: new Date().getDate()
            });
            res.status(200).json(carreraUpdate); // Devuelve el documento guardado como respuesta
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al guardar la carrera' });
          }
      });
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la carrera' }); // Manejo de errores
    }
};

const deleteCarrera = async (req, res) => {
    try {
      const carreraId = req.params.id; // Suponiendo que el ID está en los parámetros de la solicitud
  
      // Buscar la carrera por ID y eliminarla
      const deletedCarrera = await Carrera.findByIdAndDelete(carreraId);
  
      if (!deletedCarrera) {
        return res.status(404).json({ error: 'Carrera no encontrada' });
      }
  
      res.status(200).json({ message: 'Carrera eliminada exitosamente', deletedCarrera });
    } catch (error) {
      console.error('Error al eliminar la carrera:', error);
      res.status(500).json({ error: 'Error al eliminar la carrera' });
    }
};


module.exports = {
    getCarrer,
    getCarrerById,
    postCarrer,
    patchCarrer, 
    deleteCarrera
};
