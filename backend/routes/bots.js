/**
 *  This defines all the routes of the Bot API
 *  This class relies on the controllers/BotController
 *  Uses: BotController
 */

const express = require('express');
const { jwtCheck } = require('./jwtCheck');
const { check } = require('express-validator/check');
const { BotController } = require('../controllers/BotController.js');

const router = express.Router();

/* will always return a JSON object of at most 5 bots */
router.get('/recent', jwtCheck, (request, response) => {
    const resp = BotController.getRecentBots(request, response);
    return resp;
});

/* will always return JSON of the new record details */
router.post('/update', jwtCheck, [
    check('id').exists(),
    check('name').exists(),
    check('description').exists(),
    check('configuration').exists(),
], (request, response) => {
    const resp = BotController.update(request, response);
    return resp;
});

router.get('/get/:botID', jwtCheck, (request, response) => BotController.getBot(request, response));

router.get('/all', jwtCheck, (request, response) => {
    const resp = BotController.getAllBots(request, response);
    return resp;
});

router.post('/delete/', jwtCheck, [check('botID').exists()], (request, response) => {
    const resp = BotController.deleteBot(request, response);
    return resp;
});

router.get('/getScripts/:botId', (request, response) => {
    const resp = BotController.getScripts(request, response);
    return resp;
});
module.exports = router;
