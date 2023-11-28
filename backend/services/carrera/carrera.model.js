const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de tu colección Carrer
const CarrerSchema = new Schema({
    id: Number,
    carrera: String,
    resolucion: String,
    pdf: String,
    creado: Date
});

// Exporta el modelo basado en el esquema
const Carrer = mongoose.model('Carrera', CarrerSchema, 'Carrera');
module.exports = Carrer;
