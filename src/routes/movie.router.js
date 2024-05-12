const { getAllMovies, createMovie, getOneMovie, removeMovie, updateMovie, setMovieGenre, setMovieActor, setMovieDirector } = require('../controllers/movie.contrllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAllMovies)
    .post(createMovie)

movieRouter.route('/movies/:id')
    .get(getOneMovie)
    .delete(removeMovie)
    .put(updateMovie)

movieRouter.route('/movies/:id/genres')
    .post(setMovieGenre)

movieRouter.route('/movies/:id/actors')
    .post(setMovieActor)

movieRouter.route('/movies/:id/directors')
    .post(setMovieDirector)

module.exports = movieRouter;