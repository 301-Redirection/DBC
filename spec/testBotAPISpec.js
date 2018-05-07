/* TODO: find a way to mock Auth0
 *       fix asynchronous calls and stuff...
 */
const config = require('../config/config.json');
const Sequelize = require('sequelize');
const request = require('request');
const app = require('../app');
const http = require('http');

function hasText(string, text) {
    return string.indexOf(text) !== -1;
}

describe('Bot API testing', () => {
    let sequelize;
    let server;
    const responseToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVXlSVUZCUlVFMk9UazNOalEyTkRNM09UUXdNek5CTlVRM01USkZOakE0T0VNNFJrWkRRUSJ9.eyJpc3MiOiJodHRwczovL2RvdGEtYm90LXNjcmlwdGluZy5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDAwNTE1MTAzNzI3NTM2MjQ5MjYiLCJhdWQiOlsiZG90YS1ib3Qtc2NyaXB0aW5nIiwiaHR0cHM6Ly9kb3RhLWJvdC1zY3JpcHRpbmcuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUyNTcyMDI0NiwiZXhwIjoxNTI1NzI3NDQ2LCJhenAiOiJrWXctRjlKeklUWWt5RFpvUVVpRkU1UEdxa2VBdkJfSCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.SKWU2o6TkQlrwRTCdnJLDRiXPb7UuxoDq44CXnheuKWTlaS31OWbFPostbfR6ya005CTU3bKyNKUP_qyeiSjIZemwgLMuE8YR4H0RDQ3CUpeKoK_qfKV1_FHsHRwM39rSEunr9SyvBCm2ZKbOM2GovOZCQAVlxjs9zQ6obIRxnEZJoJ-8kF-KTGX4RHdFZ2XtveR7NAChKeT9oApjUC-ZyQAxaFTMb_55Ux59XyxJ7X7icjp31kZV30PtQBnZQAv1HJzMbafZpuecSrgZ2taGWsSqB3uahTxPnIHujZ0PwhSXs_m1TNUaXl681NvQweTp18a8h3Rl6hWI6MGlTU6Ug';
    let originalTimeout;
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
                dialectOptions: { multipleStatements: true }
            }
        );
        sequelize.query(`USE ${config.test.database}`).then(() => { done(); })
            .then(() => {
                // clear all entries from table
                sequelize.query('DELETE FROM BotConfigs');
            });
        // const options = {
        //     method: 'POST',
        //     url: 'https://u16039689.auth0.com/oauth/token',
        //     headers: { 'content-type': 'application/json' },
        //     body: {
        //             grant_type: 'client_credentials',
        //             client_id: '2sKYIhmVy6iQeTetLnTpYIfS1Zxb1t7n',
        //             client_secret: 'f4NdakjW_JwmhE8mYin_P-_
        // EGepdF8nYBGY1YoUvmFa2Q6ZJXGlGCghAjC3xJeIi',
        //             audience: 'https://u16039689.auth0.com/api/v2/',
        //         },
        //     json: true
        // };

        // request(options, (error, response, body) => {
        //     if (error) throw new Error(error);
        //     console.log(body);
        //     responseToken = body;
        //     done();
        // });
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
    const header = {
        authorization: `bearer ${responseToken}`,
    };
    const postHeader = {
        authorization: `bearer ${responseToken}`,
        'content-type': 'application/json',
    };
    // for config data that we post at some point
    const exampleConfig = JSON.stringify({
        teamDesires: {
            defend: {
                top: 0.6,
                mid: 0.6,
                bot: 0.6,
            },
            push: {
                top: 0.6,
                mid: 0.6,
                bot: 0.6,
            },
            roam: 0.6,
            roshan: 0.6,
        },
    });

    let validId;
    describe('', () => {
        // creating a bot in a valid way
        it('-- Initial Recent', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/recent',
                headers: header,
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const json = JSON.parse(body);
                console.log(json);
                expect(json.botConfigs).toBeDefined();
                expect(json.botConfigs.length).toBe(0);
                done();
            });
        });
        it('--Initial All', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/all',
                headers: header
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const json = JSON.parse(body);
                console.log(json);
                expect(json.botConfigs).toBeDefined();
                expect(json.botConfigs.length).toBe(0);
                done();
            });
        });
        it('-- New valid botconfig ', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: server.address().port,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                bot: {
                    id: -1,
                    name: 'Test bot 1',
                    description: 'Bot made during jasmine testing of express',
                    configuration: exampleConfig,
                },
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    // console.log(`!!!RESPONSE`);
                    expect(hasText(chunk, 'error')).toBe(false);
                    const chunkJSON = JSON.parse(chunk);
                    // console.log(chunkJSON);
                    // console.log(chunkJSON.botConfig);
                    expect(chunkJSON.botConfig.id).toBeGreaterThan(0);
                    validId = chunkJSON.botConfig.id;
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('-- New botconfig missing parameters', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/update',
                port: server.address().port,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                bot: {
                    id: -1,
                    name: 'Test bot 1',
                },
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    expect(hasText(chunk, 'error')).toBe(true);
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
                port: server.address().port,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {};
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    expect(hasText(chunk, 'error')).toBe(true);
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
                port: server.address().port,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                bot: {
                    id: validId,
                    // new value
                    name: 'Test bot 666',
                    description: 'Bot made during jasmine testing of express',
                    configuration: exampleConfig,
                },
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    // console.log(`!!!RESPONSE`);
                    expect(hasText(chunk, 'error')).toBe(false);
                    const chunkJSON = JSON.parse(chunk);
                    // console.log(chunkJSON);
                    // console.log(chunkJSON.botConfig);
                    expect(chunkJSON.botConfig.name).toBe('Test bot 666');
                    expect(chunkJSON.botConfig.id).toBe(validId);
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
                port: server.address().port,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {
                bot: {
                    id: 989,
                    // new value
                    name: 'Test bot 666',
                    description: 'Bot made during jasmine testing of express',
                    configuration: exampleConfig,
                },
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    console.log('!!!RESPONSE');
                    expect(hasText(chunk, 'error')).toBe(false);
                    const chunkJSON = JSON.parse(chunk);
                    console.log(chunkJSON);
                    console.log(chunkJSON.botConfig);
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
                port: server.address().port,
                method: 'POST',
                headers: postHeader,
            };
            const postParamters = {};
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    expect(hasText(chunk, 'error')).toBe(true);
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
                headers: header,
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const json = JSON.parse(body);
                console.log(json);
                expect(json.botConfigs).toBeDefined();
                expect(json.botConfigs.length).toBe(1);
                done();
            });
        });
        it('--All', (done) => {
            const options = {
                url: 'http://localhost:3000/bots/all',
                headers: header,
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                console.log('json ' + body);
                const json = JSON.parse(body);
                expect(json.botConfigs).toBeDefined();
                expect(json.botConfigs.length).toBe(1);
                done();
            });
        });
        it('-- Get validId bot', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/get',
                port: server.address().port,
                method: 'GET',
                headers: header,
            };
            const postParamters = {
                botId: validId,
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    expect(chunk).not.toBe('{}');
                    const chunkJSON = JSON.parse(chunk);
                    expect(chunkJSON.id).toBe(validId);
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
        it('-- Get bot with invalid id', (done) => {
            const options = {
                hostname: 'localhost',
                path: '/bots/get',
                port: server.address().port,
                method: 'GET',
                headers: header,
            };
            const postParamters = {
                botId: 666,
            };
            const postData = JSON.stringify(postParamters);
            const req = http.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    expect(chunk).toBe('{}');
                    done();
                });
            });
            req.on('error', (e) => {
                throw e;
            });
            req.write(postData);
            req.end();
        });
    });
});

