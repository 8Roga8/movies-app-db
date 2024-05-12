const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');

const getAllGenres = catchError(async(req, res) => {
    const genres = await Genre.findAll();
    return res.json(genres);
});

const createGenre = catchError(async(req, res) =>{
    const {name} = req.body;
    const genre = await Genre.create({
        name: name
    });
    return res.status(201).json(genre);
});

const getOneGenre = catchError(async(req, res) => {
    const {id} = req.params;
    const genre = await Genre.findByPk(id);
    return res.json(genre);
});

const removeGenre = catchError(async(req, res) => {
    const {id} = req.params;
    await Genre.destroy({ where: {id:id} });
    return res.sendStatus(204)
});

const updateGenre = catchError(async(req, res) => {
    const {name} = req.body;
    const {id} = req.params;
    const genre = await Genre.update({
        name,
    }, { where: {id:id}, returning: true })
    return res.json(genre[1][0]);
});

module.exports = {
    getAllGenres,
    createGenre,
    getOneGenre,
    removeGenre,
    updateGenre,
}