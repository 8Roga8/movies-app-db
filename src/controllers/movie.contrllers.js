const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director')

const getAllMovies = catchError(async(req, res) => {
    const movies = await Movie.findAll({include: [Genre, Actor, Director]});
    return res.json(movies);
});

const createMovie = catchError(async(req, res) =>{
    const {name, image, synopsis, releaseYear} = req.body;
    const movie = await Movie.create({
        name,
        image,
        synopsis,
        releaseYear
    })
    return res.status(201).json(movie);
});

const getOneMovie = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id, {include: [Genre, Actor, Director]});
    if(!movie) return res.status(404).json({message: "Pelicula no encontrada."})
    return res.json(movie);
});

const removeMovie = catchError(async(req, res) => {
    const {id} = req.params;
    await Movie.destroy({ where: {id:id} });
    return res.sendStatus(204)
});

const updateMovie = catchError(async(req, res) => {
    const {id} = req.params;
    const {name, image, synopsis, releaseYear} = req.body;
    const movie = await Movie.update({
        name: name,
        image: image,
        synopsis: synopsis,
        releaseYear: releaseYear
    }, { where: {id:id}, returning: true })
    return res.json(movie[1][0])
});

const setMovieGenre = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.status(404).json({message: "Pelicula no encontrada"});
    await movie.setGenres(req.body);
    const genre = await movie.getGenres();
    return res.json(genre);
});

const setMovieActor = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.status(404).json({message: "Pelicula no encontrada"});
    await movie.setActors(req.body);
    const actor = await movie.getActors();
    return res.json(actor);
});

const setMovieDirector = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.status(404).json({message: "Pelicula no encontrada"});
    await movie.setDirectors(req.body);
    const director = await movie.getDirectors();
    return res.json(director);
});

module.exports = {
    getAllMovies,
    createMovie,
    getOneMovie,
    removeMovie,
    updateMovie,
    setMovieGenre,
    setMovieActor,
    setMovieDirector    
}