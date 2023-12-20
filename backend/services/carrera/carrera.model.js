const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CarreraSchema = new Schema({
    carrera: String,
    resolucion: String,
    pdf: String,
    creado: { type: Date, default: Date.now },
    actualizado:  { type: Date, default: Date.now },
});
const Carrera = mongoose.model('Carrera', CarreraSchema, 'Carrera');
module.exports = Carrera;
