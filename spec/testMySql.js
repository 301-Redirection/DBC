let models = require('../models');
let config = require('../config/config.json');

var Sequelize = require('sequelize');

// console.log(config);
// console.log(config.test.database);

describe('Server', () => {
    var server;
    var sequelize;
    beforeAll(() => {
        var app = require('../app');
        server = app.listen(3000, () => {
            console.log('Listening on port ' + server.address().port + '...');
        });
        sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
            host: 'localhost',
            dialect: 'mysql',
        });
    });
    afterAll(() => {
        server.close();
    });
    
    describe('MySQL connection:', () => {
        it("exists ", function() {
            sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                expect(true).toBe(true);
            })
            .catch(function (err) {
                console.log(err);
                expect('Connection').toBe('Error');
            })
        });
    });

});