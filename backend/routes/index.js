/**
 *  This defines the default routes used by the webpage, such as
 *  the home page, logging out and some authentication tests which
 *  should probably be removed later (by someone else :D)
 *  Uses: IndexController
 */

const express = require('express');
// const { jwtCheck } = require('./jwtCheck');
const { IndexController } = require('../controllers/IndexController.js');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    IndexController.getHomePage(req, res);
});

router.get('/test', (req, res) => {
    IndexController.test(req, res);
});

router.get('/download/:id([0-9]+)', (req, res) => {
    IndexController.download(req, res);
});
module.exports = router;
