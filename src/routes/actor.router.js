const { getAllActors, createActor, getOneActor, removeActor, updateActor } = require('../controllers/actor.controllers');
const express = require('express');

const actorRouter = express.Router();

actorRouter.route('/actors')
    .get(getAllActors)
    .post(createActor);

actorRouter.route('/actors/:id')
    .get(getOneActor)
    .delete(removeActor)
    .put(updateActor);

module.exports = actorRouter;