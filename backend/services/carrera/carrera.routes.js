const express = require('express'); 
const { getCarrer, getCarrerById, postCarrer, patchCarrer, deleteCarrera } = require('./carrera.controller')

const carrerRoutes = express.Router();

carrerRoutes.route('/')
    .get(getCarrer)
    .post(postCarrer)

carrerRoutes.route('/:id')
    .get(getCarrerById)
    .patch(patchCarrer)
    .delete(deleteCarrera)

module.exports = carrerRoutes