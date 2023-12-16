const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticiaSchema = new Schema({    
    titulo:String,
    cuerpo:String,
    img:String,
    id_carrera:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
      }, 
    autor:String,
    creado: { type: Date, default: Date.now },
    actualizado:  { type: Date, default: Date.now },
});

const Noticia = mongoose.model('Noticia', NoticiaSchema, 'Noticia');
module.exports = Noticia;
