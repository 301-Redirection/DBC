var express = require('express');
var router = express.Router();
const passport = require('passport');
var models = require('../models');
const sequelize = require('sequelize');
var fs = require('fs');  
var path = require('path');
var mime = require('mime');
var generateScript = require('../server/generateScript.js');

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
    var error = req.flash('error');
    var error_description = req.flash('error_description');
    req.logout();
    res.render('failure', {
        error: error[0],
        error_description: error_description[0],
    });
});

router.get('/test', (request, response) => {
    response.status(500).send({ 'message': 'This is an error response' });
});


// Generates the bot TeamDesires script
router.post('/generate', function(req, res) {        
    var scriptBuilder = '';
    
    // Generates the team desire functions from ../server/generateScript.js
    scriptBuilder = generateScript.generateTeamDesires(req);    

    // //Adds the script name and the description as a comment at the top of the file
    // scriptBuilder += '-- ' + req.body['teamDesires']['name'] + '--\n \
    // [[ ' + req.body.teamDesires.description + ']]\n';

    // //Creates the UpdateRoshanDesire function    
    // scriptBuilder += 'function UpdateRoshanDesires()\n';    
    // scriptBuilder += `    return ${req.body.teamDesires.roshan/10};\n`
    // scriptBuilder += 'end\n\n';

    // //Creates the UpdateRoamDesire function
    // scriptBuilder += 'function UpdateRoamDesires()\n';
    // scriptBuilder += `    return \{${req.body.teamDesires.roam/10}, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}\n`;
    // scriptBuilder += 'end\n\n';

    // //Creates the UpdatePushLaneDesires function
    // scriptBuilder += 'function UpdatePushLaneDesires() \n';
    // scriptBuilder += `    return \{${(req.body.teamDesires.push.top)/10}, ${(req.body.teamDesires.push.mid)/10}, ${(req.body.teamDesires.push.bot)/10}\}\n`;
    // scriptBuilder += 'end\n\n';

    // //Creates the UpdateDefendLaneDesires function
    // scriptBuilder += 'function UpdateDefendLaneDesires() \n';
    // scriptBuilder += `    return {${(req.body.teamDesires.defend.top)/10}, ${(req.body.teamDesires.defend.mid)/10}, ${(req.body.teamDesires.defend.bot)/10}}\n`;
    // scriptBuilder += 'end\n\n';

    // //Creates the UpdateFarmLaneDesires function    
    // scriptBuilder += 'function UpdateFarmLaneDesires() \n';
    // scriptBuilder += `    return {${(req.body.teamDesires.farm.top)/10}, ${(req.body.teamDesires.farm.mid)/10}, ${(req.body.teamDesires.farm.bot)/10}}\n`;
    // scriptBuilder += 'end';

    try {
        fs.mkdirSync('./Lua');
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
    fs.writeFile('./Lua/team_desires.lua', scriptBuilder, (err) => {
        if (err) throw err;
        var file = './Lua/team_desires.lua';
    });
    res.status(200).send({id: 'team_desires.lua'});

});

router.get('/download/:id([a-zA-Z0-9_\\.]+)', function(req, res){

    var file = __dirname + '/../Lua/' + req.params.id;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
    res.download(file);
});

/** The following routes are here to quickly demonstrate how one would use sequelize.
 *  please consult the documentation for all possible options
 *  http://docs.sequelizejs.com/manual/tutorial/querying.html
 */
router.get('/example/sequelizer', (request, res) => {
    models.BotConfig.findAll({
        include: [{
            model: models.User,
            as: 'user',
        }],
    }).then(function(models) {
        res.render('exampleSequelize', { title: 'Backend testing of auth0', models: models });
    });
});

router.get('/example/sequelizer/user', (request, res) => {
    models.User.findAll({
        include: [{
            model: models.BotConfig,
            as: 'botConfigs',
          }],
    }).then(function(models) {
        res.render('exampleSequelize', { title: 'Backend testing of auth0', models: models });
    });
});

router.get('/example/sequelizer/user/5', (request, res) => {
    models.User.findAll({
        include: [{
            model: models.BotConfig,
            as: 'botConfigs',
        }],
        where: {
          id: 5
        }
    }).then(function(models) {
        res.render('exampleSequelize', { title: 'Backend testing of auth0', models: models });
    });
});

const Op = sequelize.Op;
router.get('/example/sequelizer/user/query', (request, res) => {
    models.User.findAll({
        include: [{
            model: models.BotConfig,
            as: 'botConfigs',
        }],
        where: {
           [Op.or]: [{id: 12}, {id: 13}]
          // alternatives ways (syntax) to query 
          //  id: {
          //     [Op.and]: {
          //       [Op.lt]: 13,
          //       [Op.gt]: 4
          //   }
          //  },
          // firstname: {
          //   [Op.like]: 'a%'
          // }
        }
    }).then(function(models) {
        res.render('exampleSequelize', { title: 'Backend testing of auth0', models: models });
    });
});

module.exports = router;