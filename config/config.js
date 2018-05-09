const fs = require('fs');
const path = require('path');

let config = { development: { } };

try {
    const jsonRaw = fs.readFileSync(path.join(__dirname, '..', '.env'));
    config = JSON.parse(jsonRaw);
} catch (err) {
    // This just falls back on the config
}

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
};
