const express = require('express'); 
const { getDescargaArchivos } = require('./descarga.controller')

const archivosRoutes = express.Router();

archivosRoutes.route('/:url')
    .get(getDescargaArchivos)

module.exports = archivosRoutes