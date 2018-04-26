const express = require('express');
const models = require('../models');
const sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const router = express.Router();
const env = {
    AUTH0_CLIENT_ID: 'kYw-F9JzITYkyDZoQUiFE5PGqkeAvB_H',
    AUTH0_DOMAIN: 'dota-bot-scripting.eu.auth0.com',
    AUTH0_CALLBACK_URL: 'http://localhost:3000/callback',
    AUTH0_API_AUDIENCE: 'dota-bot-scripting',
};

const LIMIT_NUMBER = 5;

/* will always return a JSON object of at most 5 bots */
router.get('bots/recent', jwtCheck, (request, response) => {
    models.BotConfig.findAll({
        where: { user_id: request.user.sub },
        order: [
            ['updatedAt', 'DESC'],
        ],
        limit: LIMIT_NUMBER,
    })
    .then((botConfigs) => {
        response.status(200).send({ botConfigs: botConfigs});
    });
});

/* will always return JSON of the new record details */
router.post('bots/alter', jwtCheck, (request, response) => {
    const name = req.body.name;
    const id = req.body.id;
    const description = req.body.description;
    const title = req.body.title;
    const configuration = req.body.configuration;
    const user_id = request.user.sub;
    // condition for creating a botconfig entry
    if (id === -1) {
        models.BotConfig.create({
            name: name,
            description: description,
            title: title,
            configuration: configuration,
            user_id: user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then((botConfig) => {
            response.status(200).send({ botConfig: botConfig});
        });
    }
    else {
        models.BotConfig.find({
            where: { 
                user_id: request.user.sub,
                id: id,
            },
        })
        .then((botConfig) => {
            botConfig.update({
                name: name,
                description: description,
                title: title,
                configuration: configuration,
                updatedAt: new Date(),
            });
            response.status(200).send({ botConfig: botConfig});
        });
    }
});

module.exports = router;