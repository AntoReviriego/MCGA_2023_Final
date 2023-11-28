const express = require('express'); 
const { getCarrer, postCarrer } = require('./carrera.controller')

const carrerRoutes = express.Router();

carrerRoutes.route('/')
.get(getCarrer)
.post(postCarrer)

module.exports = carrerRoutes