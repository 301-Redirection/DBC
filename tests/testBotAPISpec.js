const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../backend');
require('module').Module._initPaths();
const config = require('../config/config.js');
const Sequelize = require('sequelize');
const request = require('request');
const sinon = require('sinon');
const http = require('http');
const { spawnSync } = require('child_process');

const IS_WIN = process.platform === 'win32';

let app;
let jwtStub;

function hasText(string, text) {
    return string.indexOf(text) !== -1;
}
describe('Bot API testing', () => {
    let sequelize;
    let server;
    beforeAll((done) => {
        const jwtCheck = require('routes/jwtCheck');
        jwtStub = sinon.stub(jwtCheck, 'jwtCheck')
            .callsFake((req, res, next) => {
                req.user = {};
                req.user.sub = 'auth0|5aaad1a6aa9ad130c17479ba';
                return next();
            });

        // after you can create app:
        app = require('app.js');
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
        sequelize.query(`DROP DATABASE IF EXISTS ${config.test.database};  CREATE DATABASE ${config.test.database};`)
            .then(() => {
                const otherPath = path.join('node_modules', '.bin', IS_WIN ? 'sequelize.cmd' : 'sequelize');
                const child = spawnSync(otherPath, ['db:migrate'], { stdio: [0, 1, 2] });
                if (child.error) {
                    throw child.error;
                }
                const otherPath2 = path.join('node_modules', '.bin', IS_WIN ? 'sequelize.cmd' : 'sequelize');
                const child2 = spawnSync(otherPath2, ['db:seed:all'], { stdio: [0, 1, 2] });
                if (child2.error) {
                    throw child2.error;
                }
            })
            .then(() => {
                sequelize.query(`USE ${config.test.database}`)
                    .then(() => {
                        // clear all entries from table
                        sequelize.query('DELETE FROM BotConfigs');
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    });
    afterAll(() => {
        server.close();
        jwtStub.restore();
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
    const postHeader = {
        'content-type': 'application/json',
    };
    // for config data that we post at some point
    const exampleConfig = {
        desires: {
            defend: {
                top: { initialValue: 0.6, compoundConditions: [] },
                mid: { initialValue: 0.6, compoundConditions: [] },
                bot: { initialValue: 0.6, compoundConditions: [] },
            },
            push: {
                top: { initialValue: 0.6, compoundConditions: [] },
                mid: { initialValue: 0.6, compoundConditions: [] },
                bot: { initialValue: 0.6, compoundConditions: [] },
            },
            farm: {
                top: { initialValue: 0.6, compoundConditions: [] },
                mid: { initialValue: 0.6, compoundConditions: [] },
                bot: { initialValue: 0.6, compoundConditions: [] },
            },
            roam: { initialValue: 0.6, compoundConditions: [] },
            roshan: { initialValue: 0.6, compoundConditions: [] },
        },
    };
    let validId;
    describe('', () => {
        // creating a bot in a valid way
        it('-- Initial Recent', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/recent',
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                console.log(body);
                const responseObject = JSON.parse(body);
                expect(responseObject.botConfigs).toBeDefined();
                expect(responseObject.botConfigs.length).toBe(0);
                done();
            });
        });
        it('--Initial All', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/all',
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const responseObject = JSON.parse(body);
                expect(responseObject.botConfigs).toBeDefined();
                expect(responseObject.botConfigs.length).toBe(0);
                done();
            });
        });
        it('-- New valid botconfig ', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: 3000,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                id: -1,
                name: 'Test bot 1',
                description: 'Bot made during jasmine testing of express',
                configuration: exampleConfig,
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                let response = '';
                res.on('data', (chunk) => {
                    expect(hasText(chunk, 'error')).toBe(false);
                    response += chunk;
                });
                res.on('end', () => {
                    const responseObject = JSON.parse(response);
                    expect(responseObject.botConfig.id).toBeGreaterThan(0);
                    validId = responseObject.botConfig.id;
                    done();
                });
            });
            req.on('error', (e) => {
                console.log(e);
                throw e;
            });
            req.write(postData);
            req.end();
        });

        it('-- New botconfig missing parameters', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: 3000,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                id: -1,
                name: 'Test bot 1',
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                let response = '';
                res.on('data', (chunk) => {
                    response += chunk;
                });
                res.on('end', () => {
                    expect(hasText(response, 'error')).toBe(true);
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('-- New botconfig no parameters', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: 3000,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {};
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                let response = '';
                res.on('data', (chunk) => {
                    response += chunk;
                });
                res.on('end', () => {
                    expect(hasText(response, 'error')).toBe(true);
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('-- Update past botconfig by validId', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: 3000,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                id: validId,
                // new value
                name: 'Test bot 666',
                description: 'Bot made during jasmine testing of express',
                configuration: exampleConfig,
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                let response = '';
                res.on('data', (chunk) => {
                    response += chunk;
                });
                res.on('end', () => {
                    expect(hasText(response, 'error')).toBe(false);
                    const responseObject = JSON.parse(response);
                    expect(responseObject.botConfig.name).toBe('Test bot 666');
                    expect(responseObject.botConfig.id).toBe(validId);
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('-- Update past botconfig non-existent id', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: 3000,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                id: 989,
                // new value
                name: 'Test bot 666',
                description: 'Bot made during jasmine testing of express',
                configuration: exampleConfig,
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                let response = '';
                res.on('data', (chunk) => {
                    response += chunk;
                });
                res.on('end', () => {
                    expect(hasText(response, 'error')).toBe(false);
                    expect(response).toBe('{}');
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('-- Update past botconfig no paramters', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: 3000,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {};
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                let response = '';
                res.on('data', (chunk) => {
                    response += chunk;
                });
                res.on('end', () => {
                    expect(hasText(response, 'error')).toBe(true);
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('--Recent', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/recent',
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const responseObject = JSON.parse(body);
                expect(responseObject.botConfigs).toBeDefined();
                expect(responseObject.botConfigs.length).toBe(1);
                done();
            });
        });
        it('--All', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/all',
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const responseObject = JSON.parse(body);
                expect(responseObject.botConfigs).toBeDefined();
                expect(responseObject.botConfigs.length).toBe(1);
                done();
            });
        });
        it('-- Get validId bot', (done) => {
            const options = {
                url: `http://localhost:3000/bots/get/${validId}`,
            };
            request.get(options, (err, response, body) => {
                expect(body).not.toBe('{}');
                expect(body).not.toBe('');
                if (body !== '') {
                    const responseObject = JSON.parse(body);
                    expect(responseObject.botConfig[0].id).toBe(validId);
                }
                done();
            });
        });
        it('-- Get bot with invalid id', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/get/666',
            };
            request.get(options, (err, response, body) => {
                const responseObject = JSON.parse(body);
                expect(responseObject.botConfig.length).toBe(0);
                done();
            });
        });
    });
});

