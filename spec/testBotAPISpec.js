// TODO: Ensure this test runs first

const models = require('../models');
const config = require('../config/config.json');
const Sequelize = require('sequelize');
const path = require('path');
const request = require("request");
const app = require('../app');

const IS_WIN = process.platform === 'win32';

describe('Bot API testing', () => {
    let sequelize, server;
    let responseToken;
    beforeAll((done) => {
        server = app.listen(3000, () => {
            console.log(`Listening on port ${server.address().port} ...`);
        });
        sequelize = new Sequelize(
            '',
            config.test.username,
            config.test.password,
            {
                host: 'localhost',
                dialect: 'mysql',
                dialectOptions: { multipleStatements: true },
            }
        );

        const options = { 
            method: 'POST',
            url: 'https://u16039689.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: 
                { 
                    grant_type: 'client_credentials',
                    client_id: '2sKYIhmVy6iQeTetLnTpYIfS1Zxb1t7n',
                    client_secret: 'f4NdakjW_JwmhE8mYin_P-_EGepdF8nYBGY1YoUvmFa2Q6ZJXGlGCghAjC3xJeIi',
                    audience: 'https://u16039689.auth0.com/api/v2/',
                },
            json: true
        };

        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            console.log(body);
            responseToken = body;
            done();
        });
    });
    afterAll(() => {
        server.close();
    });
    describe('MySQL connection:', () => {
        it('existence', (done) => {
            sequelize.authenticate()
                .then(() => {
                    expect(true).toBe(true);
                    done();
                });
        });
    });
    describe('Retrieve Recent Bots', () => {
        it('---', (done) => {
            console.log('responseToken');
            console.log(responseToken);
            request.headers.authorization = "bearer: " + responseToken.access_token;
            console.log(request.headers.authorization);
            request.get('http://localhost:3000/bots/recent', (err, response, body) => {
                expect(response.statusCode).toBe(200);
                if (!err && response.statusCode == 200) {
                    const result = JSON.parse(body);
                    console.log('Retrieve Recent Bots');
                    console.log(result);
                }
                done();
            });
        });
    });

});
