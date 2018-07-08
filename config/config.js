const fs = require('fs');
const path = require('path');
const configJSON = require('./config.json');

let config;
try {
    const jsonRaw = fs.readFileSync(path.join(__dirname, '..', '.env'));
    config = JSON.parse(jsonRaw);
} catch (err) {
    config = configJSON;
    // This just falls back on the config
}

config.app = configJSON.app;

module.exports = {
    development: {
        username: config.development.username || 'root',
        password: config.development.password || null,
        database: config.development.database || 'test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: config.development.username || 'root',
        password: config.development.password || null,
        database: config.development.database || 'test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    app: config.app,
    lua: config.LUA
};
