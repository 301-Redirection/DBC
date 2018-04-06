var express = require('express');
var router = express.Router();
const passport = require('passport');
var models = require('../models');

const env = {
    AUTH0_CLIENT_ID: 'kYw-F9JzITYkyDZoQUiFE5PGqkeAvB_H',
    AUTH0_DOMAIN: 'dota-bot-scripting.eu.auth0.com',
    AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};


/* GET home page. */

router.get('/', function(req, res, next) {
    if(req.user) {
        res.redirect('/user');
        return;
    }
    res.render('index', { title: 'Backend testing of auth0' });
});

router.get(
    '/login',
    passport.authenticate('auth0', {
        clientID: env.AUTH0_CLIENT_ID,
        domain: env.AUTH0_DOMAIN,
        redirectUri: env.AUTH0_CALLBACK_URL,
        audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
        responseType: 'code',
        scope: 'openid'
    }),
    function(req, res) {
        res.redirect('/');
    }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get( '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

router.get('/failure', function(req, res) {
  var error = req.flash("error");
  var error_description = req.flash("error_description");
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: error_description[0],
  });
});

router.get("/test", (request, response) => {
    response.status(500).send({ "message": "This is an error response" });
});


router.get("/example/sequelizer", (request, res) => {
  models.BotConfig.findAll({
    include: [{
        model: models.User,
        as: 'user',
      }],
  }).then(function(botconfigs) {
    console.log("BotConfig");
    console.log(botconfigs);
    // return res.status(200).send(botconfigs);
    res.render('exampleSequelize2', { title: 'Backend testing of auth0', botconfigs: botconfigs });
  });
})

router.get("/example/sequelizer/user", (request, res) => {
  models.User.findAll({
    include: [{
        model: models.BotConfig,
        as: 'botConfigs',
      }],
  }).then(function(users) {
    console.log("Users");
    console.log(users);
    // return res.status(200).send(users);
    res.render('exampleSequelize2', { title: 'Backend testing of auth0', users: users });
  });
})

module.exports = router;
