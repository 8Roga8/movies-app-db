const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');

const getAllActors = catchError(async(req, res) => {
    const actors = await Actor.findAll();
    return res.json(actors);
});

const createActor = catchError(async(req, res) => {
    const actor = await Actor.create(req.body);
    return res.status(201).json(actor);
});

const getOneActor = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if(!actor) return res.sendStatus(404);
    return res.json(actor);
});

const removeActor = catchError(async(req, res) => {
    const { id } = req.params;
    await Actor.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updateActor = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actor.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(actor[0] === 0) return res.sendStatus(404);
    return res.json(actor[1][0]);
});

module.exports = {
    getAllActors,
    createActor,
    getOneActor,
    removeActor,
    updateActor
}