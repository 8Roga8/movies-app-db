const { getAllDirectors, createDirector, getOneDirector, removeDirector, updateDirector } = require('../controllers/director.controllers');
const express = require('express');

const directorRouter = express.Router();

directorRouter.route('/directors')
    .get(getAllDirectors)
    .post(createDirector);

directorRouter.route('/directors/:id')
    .get(getOneDirector)
    .delete(removeDirector)
    .put(updateDirector);

module.exports = directorRouter;