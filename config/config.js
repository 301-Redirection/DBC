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
    // production: {
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   host: process.env.DB_HOSTNAME,
    //   dialect: 'mysql',
    //   dialectOptions: {
    //     ssl: {
    //       ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //     }
    //   }
    // }
};
// {
//     "development": {
//         "username": "root",
//         "password": "pw4root",
//         "database": "test",
//         "host": "127.0.0.1",
//         "dialect": "mysql"
//     },
//     "test": {
//         "username": "someusername",
//         "password": "somepassword",
//         "database": "database_test",
//         "host": "127.0.0.1",
//         "dialect": "mysql"
//     },
//     "production": {
//         "username": "someusername",
//         "password": "somepassword",
//         "database": "database_production",
//         "host": "127.0.0.1",
//         "dialect": "mysql"
//     },
//     "app": {
//         "API_URL": "http://localhost:3000"
//     }
// }
