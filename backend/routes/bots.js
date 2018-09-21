/**
 *  This defines all the routes of the Bot API
 *  This class relies on the controllers/BotController
 *  Uses: BotController
 */

const express = require('express');
const { jwtCheck } = require('./jwtCheck');
const { check, validationResult } = require('express-validator/check');
const { BotController } = require('../controllers/BotController.js');

const router = express.Router();

/* will always return a JSON object of at most 5 bots */
router.get('/recent', jwtCheck, (request, response) => {
    BotController.getRecentBots(request, response);
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
    BotController.updateBot(request, response);
});

router.get('/get/:botID', jwtCheck, (request, response) => BotController.getBot(request, response));

router.get('/all', jwtCheck, (request, response) => {
    BotController.getAllBots(request, response);
});

router.post('/delete', jwtCheck, [check('botID').exists()], (request, response) => {
    BotController.deleteBot(request, response);
});

router.get('/getScripts/:botId', (request, response) => {
    BotController.getScripts(request, response);
});
module.exports = router;
