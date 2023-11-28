const Carrera = require('./carrera.model');

const getCarrer = async (req, res) => {
    try {
        const carrers = await Carrera.find(); // Utiliza await para esperar la resolución de la promesa
        res.status(200).json(carrers); // Envía los datos como respuesta en formato JSON
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las carreras' }); // Manejo de errores
    }
};

const postCarrer = async (req, res) => {
    try {
        const newCarrer = new Carrera({
            carrera: req.body.carrera,
            resolucion: req.body.resolucion,
            pdf: req.body.pdf,
            creado: req.body.creado
        });
        
        const savedCarrer = await newCarrer.save(); // Guarda el nuevo documento en la base de datos
        res.status(201).json(savedCarrer); // Devuelve el documento guardado como respuesta
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la carrera' }); // Manejo de errores
    }
};

const delteCarrer = async (req, res) => {
    try {
        const newCarrer = new Carrera({
            carrera: req.body.carrera,
            resolucion: req.body.resolucion,
            pdf: req.body.pdf,
            creado: req.body.creado
        });
        
        const savedCarrer = await newCarrer.save(); // Guarda el nuevo documento en la base de datos
        res.status(201).json(savedCarrer); // Devuelve el documento guardado como respuesta
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar la carrera' }); // Manejo de errores
    }
};


module.exports = {
    getCarrer,
    postCarrer
};
