var express = require('express');
var router = express.Router();
const passport = require('passport');

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
        // audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',        
        audience: 'dota-bot-scripting',        
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

module.exports = router;
