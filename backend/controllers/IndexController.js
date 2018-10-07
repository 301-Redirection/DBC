/**
 *  This class defines an the action that are required by the default page
 *  of the application, with events such as logging, logging out etc.
 */

const path = require('path');
const models = require('models');
const { getBotScriptDirectory } = require('./codeGeneration/generateScript.js');

class IndexController {
    static getHomePage(request, response) {
        if (request.user) {
            response.redirect('/user');
            return;
        }
        response.render('index', { title: 'Backend testing of auth0' });
    }

    static logout(request, response) {
        request.logout();
        response.redirect('/');
    }

    static failure(request, response) {
        const error = request.flash('error');
        const errorDescription = request.flash('error_description');
        request.logout();
        response.render('failure', {
            error: error[0],
            errorDescription: errorDescription[0],
        });
    }

    static test(request, response) {
        response.status(500).send({ message: 'This is an error response' });
    }

    static download(request, response) {
        const botId = request.params.id;
        // TO DO, validate bot id...
        let tempId;
        models.BotConfig.findById(botId).then((botConfig) => {
            tempId = botConfig.userId;
            const scriptFolder = getBotScriptDirectory(tempId, botId);
            const file = path.join(scriptFolder, `${botId}.zip`);
            response.download(file);
        });
    }

    static testAuthentication(request, response) {
        response.status(500).send({ message: 'you have been sucessfully authenticated' });
    }
}
module.exports.IndexController = IndexController;
