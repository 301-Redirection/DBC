/**
 *   This defines the routes used to retrieve static (data that is not
 *   expected to change such as images, items and heroes lists)
 *   Uses: StaticController
 */

const express = require('express');
const { StaticController } = require('../controllers/StaticController.js');

const router = express.Router();

router.get('/items/all', (request, response) => {
    StaticController.getAllItems(request, response);
});
router.get('/items/images/:imageName', (request, response) => {
    StaticController.respondToImageRequest(request, response, 'items');
});

router.get('/heroes/all', (request, response) => {
    StaticController.getAllHeroes(request, response);
});
router.get('/heroes/images/:imageName', (request, response) => {
    StaticController.respondToImageRequest(request, response, 'heroes');
});

router.get('/abilities/images/:imageName', (request, response) => {
    StaticController.respondToImageRequest(request, response, 'abilities');
});
module.exports = router;
