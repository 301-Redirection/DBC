var express = require('express');
var router = express.Router();
const passport = require('passport');
var models = require('../models');
const sequelize = require('sequelize');

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
    var scriptBuilder = "";

    //Adds the script name and the description as a comment at the top of the file
    scriptBuilder += '-- ' + req.body.teamDesires.name + '--\
                      [[ ' + req.body.teamDesires.description + ']]';

    //Creates the UpdateRooshanDesire function
    scriptBuilder += 'function UpdateRoshanDesire() \
                        return ' + req.body.teamDesires.roshan + '\
                    end';

    //Creates the UpdateRoamDesire function
    scriptBuilder += 'function UpdateRoamDesire() \
                        return {' + req.body.teamDesires.roam + ' GetTeamMember(' + ((GetTeam() == TEAM_RADIANT) ? 'TEAM_RADIANT' : 'TEAM_DIRE') + ',' + RandomInt(1, 5 ) + ')}\
                    end';

    //Creates the UpdatePushLaneDesires function
    scriptBuilder += 'function UpdatePushLaneDesires() \
                        return {' + req.body.teamDesires.push.top + ',' + req.body.teamDesires.push.mid + req.body.teamDesires.push.bot + '}\
                    end';

    //Creates the UpdateDefendLaneDesires function
    scriptBuilder += 'function UpdateDefendLaneDesires() \
                        return ' + req.body.teamDesires.defend.top + ',' + req.body.teamDesires.defend.mid + req.body.teamDesires.defend.bot + '\
                    end';

    //Creates the UpdateFarmLaneDesires function    
    scriptBuilder += 'function UpdateFarmLaneDesires() \
                        return ' + req.body.teamDesires.farm.top + ',' + req.body.teamDesires.farm.mid + req.body.teamDesires.farm.bot + '\
                    end';


    /*lua = 'io.write(\"Hello World\\n\")';
    try {
        fs.mkdirSync('./Lua');
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
    fs.writeFile('./Lua/TeamDesires.lua', lua, (err) => {
        if (err) throw err;
           res.send('File Generated: TeamDesiires.lua');
        var file = './Lua/TeamDesires.lua';
        res.download(file);
    });*/

    console.log(scriptBuilder);
    res.status(200).send("Received");
})

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