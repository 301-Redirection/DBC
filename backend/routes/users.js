/**
 *  This file defines routes used by our auth system to retrieve user profiles
 *  and to download a zip file (if it exists on server)
 */
const express = require('express');
const connectEnsureLogin = require('connect-ensure-login');
const { UserController } = require('../controllers/UserController.js');

const ensureLoggedIn = connectEnsureLogin.ensureLoggedIn();
const router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, (req, res) => {
    UserController.getProfile(req, res);
});

router.get('/generate', ensureLoggedIn, (req, res) => {
    UserController.generate(req, res);
});
module.exports = router;
