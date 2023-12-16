const express = require('express'); 
const { getNoticia, getNoticiaById, postNoticia, patchNoticia, deleteNoticia } = require('./noticia.controller')

const NoticiaRoutes = express.Router();

NoticiaRoutes.route('/')
    .get(getNoticia)
    .post(postNoticia)

NoticiaRoutes.route('/:id')
    .get(getNoticiaById)
    .patch(patchNoticia)
    .delete(deleteNoticia)

module.exports = NoticiaRoutes