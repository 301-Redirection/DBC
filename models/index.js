/**
 * This is an automatically generated file from Sequelize node module;
 * it is made when a model is created
 *
 * Purpose: this file appears to group all other js files in this directory under 
 *          the variable name model such that model.User can be called.
 *
 * Intended use: as per the Sequelize documentation, you are intended to 
 *               require('models') which will require the index.js file, which returns
 *               returns a model variable which houses all defined models for Sequelize.
 *
 */

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';

/** the following line was altered to retrieve data from the root .env file 
 *  if that fails, it will retrieve data from the config/config.json which it should
 *  never do...
 */
var config;
try {
    var jsonRaw = fs.readFileSync(path.join(__dirname, '..', '.env'));
    config = JSON.parse(jsonRaw)['MySQL'][env];
}
catch(err) {
    config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]
}
var db        = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/** this following code appears to group all other js files in this directory under 
 *  into the db variable, then later associates the files by their 'hasOne' or 'belongsTo'
 *  relationships and it exports a model variable where all models in this directory
 *  can be accessed from, for example model.User can be called.
 */ 
fs .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

console.log('testing');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
