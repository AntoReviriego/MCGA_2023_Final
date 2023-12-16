const express = require('express'); 
const { getCarrera, getCarreraById, postCarrera, patchCarrera, deleteCarrera } = require('./carrera.controller')

const carreraRoutes = express.Router();

carreraRoutes.route('/')
    .get(getCarrera)
    .post(postCarrera)

carreraRoutes.route('/:id')
    .get(getCarreraById)
    .patch(patchCarrera)
    .delete(deleteCarrera)

module.exports = carreraRoutes