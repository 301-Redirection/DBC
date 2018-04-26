const express = require('express');
const models = require('../models');
const { jwtCheck } = require('./jwtCheck');

const router = express.Router();

const LIMIT_NUMBER = 5;

/* will always return a JSON object of at most 5 bots */
router.get('/recent', jwtCheck, (request, response) => {
    models.BotConfig.findAll({
        where: { userId: request.user.sub },
        order: [
            ['updatedAt', 'DESC'],
        ],
        limit: LIMIT_NUMBER,
    })
        .then((botConfigs) => {
            response.status(200).send({ botConfigs });
        });
});

/* will always return JSON of the new record details */
router.post('/update', jwtCheck, (request, response) => {
    const {
        name, id, description, configuration,
    } = request.body.bot;
    const userId = request.user.sub;
    // condition for creating a botconfig entry
    if (id === -1) {
        models.BotConfig.create({
            name,
            description,
            configuration,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .then((botConfig) => {
                response.status(200).send({ botConfig });
            });
    } else {
        models.BotConfig.find({
            where: {
                userId: request.user.sub,
                id,
            },
        })
            .then((botConfig) => {
                botConfig.update({
                    name,
                    description,
                    configuration,
                    updatedAt: new Date(),
                });
                response.status(200).send({ botConfig });
            });
    }
});

module.exports = router;
