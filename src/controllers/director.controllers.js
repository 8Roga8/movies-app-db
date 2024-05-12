const catchError = require('../utils/catchError');
const Director = require('../models/Director');

const getAllDirectors = catchError(async(req, res) => {
    const directors = await Director.findAll();
    return res.json(directors);
});

const createDirector = catchError(async(req, res) => {
    const director = await Director.create(req.body);
    return res.status(201).json(director);
});

const getOneDirector = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if(!director) return res.sendStatus(404);
    return res.json(director);
});

const removeDirector = catchError(async(req, res) => {
    const { id } = req.params;
    await Director.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updateDirector = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(director[0] === 0) return res.sendStatus(404);
    return res.json(director[1][0]);
});

module.exports = {
    getAllDirectors,
    createDirector,
    getOneDirector,
    removeDirector,
    updateDirector
}