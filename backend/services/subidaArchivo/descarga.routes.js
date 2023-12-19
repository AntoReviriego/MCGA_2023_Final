const express = require('express'); 
const { getDescargaArchivos, getVerImg} = require('./descarga.controller')

const archivosRoutes = express.Router();

archivosRoutes.route('/:url')
    .get(getVerImg)
archivosRoutes.route('/:d/:url')
    .get(getDescargaArchivos)

module.exports = archivosRoutes