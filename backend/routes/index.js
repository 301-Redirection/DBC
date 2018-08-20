/**
 *  This defines the default routes used by the webpage, such as
 *  the home page, logging out and some authentication tests which
 *  should probably be removed later (by someone else :D)
 *  Uses: IndexController
 */

const express = require('express');
const { jwtCheck } = require('./jwtCheck');
const { IndexController } = require('../controllers/IndexController.js');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    IndexController.getHomePage(req, res);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    IndexController.logout(req, res);
});

router.get('/failure', (req, res) => {
    IndexController.failure(req, res);
});

router.get('/test', (req, res) => {
    IndexController.test(req, res);
});

router.get('/download/:id([a-zA-Z0-9_\\.]+)', (req, res) => {
    IndexController.download(req, res);
});

/* just to test request and via its details */
router.get('/testAuthentication', jwtCheck, (req, res) => {
    IndexController.testAuthentication(req, res);
});
module.exports = router;
