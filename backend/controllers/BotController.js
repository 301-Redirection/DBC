/**
 *  This class defines an interface to be used whenever a component of the
 *  system wishes to interact with any bot configurations in the database
 */

const models = require('models');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const { writeScripts, shouldRegenerateBotScripts } = require('./codeGeneration/generateScript.js');

const PATH_TO_LUA = path.join(__dirname, '..', '..', '..', 'public', 'lua');
const LIMIT_NUMBER = 5;

class BotController {
    static getRecentBots(request, response) {
        models.BotConfig.findAll({
            where: { userId: request.user.sub },
            order: [
                ['updatedAt', 'DESC'],
            ],
            limit: LIMIT_NUMBER,
        })
            .then((botConfigs) => {
                response.status(200).json({ botConfigs });
            })
            .catch(() => {
                response.status(500).json({ error: true, message: 'Database Error' });
            });
    }

    static updateBot(request, response) {
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
                })
                .catch(() => {
                    response.status(500).json({ error: true, message: 'Database Error' });
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
            // .catch(() => {
            //     response.status(500).json({ error: true, message: 'Database Error' });
            // });
        }
    }

    static getBot(request, response) {
        const id = request.params.botID;
        models.BotConfig.findAll({
            where: {
                userId: request.user.sub,
                id,
            },
        })
            .then((botConfig) => {
                response.status(200).json({ botConfig });
            })
            .catch(() => {
                response.status(500).json({ error: true, message: 'Database Error' });
            });
    }

    static getAllBots(request, response) {
        models.BotConfig.findAll({
            where: { userId: request.user.sub },
        })
            .then((botConfigs) => {
                response.status(200).json({ botConfigs });
            })
            .catch(() => {
                response.status(500).json({ error: true, message: 'Database Error' });
            });
    }

    static deleteBot(request, response) {
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
    }

    static getScripts(request, response) {
        const id = request.params.botID;
        models.BotConfig.find({
            where: {
                userId: request.user.sub,
                id,
            },
        })
            .then((botConfig) => {
                request.body = JSON.parse(botConfig.configuration);
                const userId = request.user.sub;
                if (shouldRegenerateBotScripts(userId, botConfig.id, botConfig.updatedAt)) {
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
    }
}
module.exports.BotController = BotController;
