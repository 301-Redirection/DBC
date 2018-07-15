const express = require('express');
const models = require('models');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { jwtCheck } = require('./jwtCheck');
const { check, validationResult } = require('express-validator/check');
const { writeScripts, shouldRegenerateBotScripts } = require('controllers/generateScript.js');

const PATH_TO_LUA = path.join(__dirname, '..', '..', '..', 'public', 'lua');

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
            response.status(200).json({ botConfigs });
        });
});
/* will always return JSON of the new record details */
router.post('/update', jwtCheck, [
    check('id').exists(),
    check('name').exists(),
    check('description').exists(),
    check('configuration').exists(),
], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(422).json({ errors: errors.mapped() });
        return;
    }
    const {
        name, id, description, configuration,
    } = request.body;
    const userId = request.user.sub;
    // condition for creating a botconfig entry
    if (id === -1) {
        models.BotConfig.create({
            name,
            description,
            configuration: JSON.stringify(configuration),
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
            .then((botConfig) => {
                writeScripts(request, response, request.user.sub, botConfig.id);
                response.status(200).json({ botConfig });
            });
    } else {
        models.BotConfig.find({
            where: {
                userId: request.user.sub,
                id,
            },
        })
            .then((botConfig) => {
                if (botConfig !== null) {
                    botConfig.update({
                        name,
                        description,
                        configuration: JSON.stringify(configuration),
                        updatedAt: new Date(),
                    });
                    writeScripts(request, response, request.user.sub, botConfig.id);
                    response.status(200).json({ botConfig });
                } else {
                    response.status(200).json({});
                }
            });
    }
});
router.get('/get/:botID', jwtCheck, (request, response) => {
    const id = request.params.botID;
    models.BotConfig.findAll({
        where: {
            userId: request.user.sub,
            id,
        },
    })
        .then((botConfig) => {
            response.status(200).json({ botConfig });
        });
});
router.get('/all', jwtCheck, (request, response) => {
    models.BotConfig.findAll({
        where: { userId: request.user.sub },
    })
        .then((botConfigs) => {
            response.status(200).json({ botConfigs });
        });
});
router.get('/delete/:botID', jwtCheck, (request, response) => {
    const id = request.params.botID;
    models.BotConfig.destroy({
        where: {
            userId: request.user.sub,
            id,
        },
    })
        .then(() => {
            response.status(200).json({ deleted: true });
        })
        .catch(() => {
            response.status(500).json({ error: true, deleted: false });
        });
});
router.get('/getScripts/:botId', (request, response) => {
    const id = request.params.botID;
    models.BotConfig.find({
        where: {
            userId: request.user.sub,
            id,
        },
    })
        .then((botConfig) => {
            request.body = JSON.parse(botConfig.configuration);
            if (shouldRegenerateBotScripts(request.user.sub, botConfig.id, botConfig.updatedAt)) {
                writeScripts(request, response, request.user.sub, botConfig.id);
            }
            const file = path.join(PATH_TO_LUA, request.user.sub, `${botConfig.id}.zip`);
            const filename = path.basename(file);
            const mimetype = mime.lookup(file);
            response.setHeader('Content-disposition', `attachment; filename=${filename}`);
            response.setHeader('Content-type', mimetype);
            const filestream = fs.createReadStream(file);
            filestream.pipe(response);
            response.download(file);
        })
        .catch((err) => {
            response.status(500).json({ error: true, message: err });
        });
});
module.exports = router;
