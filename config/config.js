const fs = require('fs');
const path = require('path');

const jsonRaw = fs.readFileSync(path.join(__dirname, '..', '.env'));
console.log(JSON.parse(jsonRaw));
const config = JSON.parse(jsonRaw);

module.exports = {
    development: {
        username: config.development.username,
        password: config.development.password,
        database: config.development.database,
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'database_test',
        password: null,
        database: 'database_test',
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
