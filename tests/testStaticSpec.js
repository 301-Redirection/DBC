const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../backend');
require('module').Module._initPaths();
const request = require('request');
const { spawnSync } = require('child_process');
const fs = require('fs');


let app;

describe('Static testing', () => {
    let server;
    beforeAll((done) => {
        app = require('app.js');
        server = app.listen(3000, () => {
            console.log(`Listening on port ${server.address().port} ...`);
            done();
        });

        const child = spawnSync('npm', ['run', 'scrape', '--', 'test'], { stdio: [0, 1, 2] });
        console.log('here');
        if (child.error) {
            throw child.error;
        }
    });
    afterAll(() => {
        server.close();
    });
    describe('', () => {
        // creating a bot in a valid way
        it('-- All items and valid image', (done) => {
            const options = {
                url: 'http://localhost:3000/static/items/all',
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const responseObject = JSON.parse(body);
                expect(responseObject.length).not.toBeLessThan(200);

                const imageOptions = {
                    url: `http://localhost:3000${responseObject.items[0].url}`,
                };
                request.get(imageOptions, (imageErr, imageResponse, imageBody) => {
                    if (imageErr) { throw imageErr; }
                    const expectedOutputPath = path.join(
                        __dirname,
                        'referenceFiles',
                        'blinkDagger.png'
                    );
                    const expectedOutput = fs.readFileSync(expectedOutputPath).toString();
                    expect(imageBody).toBe(expectedOutput);
                    done();
                });
            });
        });

        it('-- All heroes and valid image', (done) => {
            const options = {
                url: 'http://localhost:3000/static/heroes/all',
            };
            request.get(options, (err, response, body) => {
                if (err) { throw err; }
                const responseObject = JSON.parse(body);
                expect(responseObject.length).not.toBeLessThan(200);
                const heroImageOptions = {
                    url: `http://localhost:3000${responseObject.heroes[0].url}`,
                };
                request.get(heroImageOptions, (heroImageErr, heroImageResponse, heroImageBody) => {
                    if (heroImageErr) { throw heroImageErr; }
                    const expectedOutputPath = path.join(
                        __dirname,
                        'referenceFiles',
                        `${responseObject.heroes[0].programName}.png`
                    );
                    const expectedOutput = fs.readFileSync(expectedOutputPath).toString();
                    expect(heroImageBody).toBe(expectedOutput);

                    // Now try the abilities
                    const heroAbilityOptions = {
                        url: `http://localhost:3000${responseObject.heroes[0].url_q}`,
                    };
                    request.get(
                        heroAbilityOptions,
                        (
                            heroAbilityErr,
                            heroAbilityResponse,
                            heroAbilityBody
                        ) => {
                            if (heroAbilityErr) { throw heroAbilityErr; }
                            const outputPath = path.join(
                                __dirname,
                                'referenceFiles',
                                `${responseObject.heroes[0].programName}_q.png`
                            );
                            const output = fs.readFileSync(outputPath).toString();
                            expect(heroAbilityBody).toBe(output);
                            done();
                        }
                    );
                });
            });
        });

        // it('-- All abilities and valid image', (done) => {
        //     const options = {
        //         url: 'http://localhost:3000/static/abilities/all',
        //     };
        //     request.get(options, (err, response, body) => {
        //         if (err) { throw err; }
        //         const responseObject = JSON.parse(body);
        //         expect(responseObject.length).not.toBeLessThan(200);

        //         const options = {
        //             url: `http://localhost:3000${responseObject.abilities[0].url}`,
        //         };
        //         request.get(options, (err, response, body) => {
        //             if (err) { throw err; }
        //             const expectedOutputPath = path.join(
        //                 __dirname,
        //                 'referenceFiles',
        //                 `${responseObject.heroes[0].programName}.png`
        //             );
        //             const expectedOutput = fs.readFileSync(expectedOutputPath).toString();
        //             expect(body).toBe(expectedOutput);
        //             done();
        //         });
        //     });
        // });
        // it('-- New valid botconfig ', (done) => {
        //     const options = {
        //         hostname: 'localhost',
        //         path: '/bots/update',
        //         port: 3000,
        //         method: 'POST',
        //         headers: postHeader,
        //     };
        //     const postParamters = {
        //         id: -1,
        //         name: 'Test bot 1',
        //         description: 'Bot made during jasmine testing of express',
        //         configuration: exampleConfig,
        //     };
        //     const postData = JSON.stringify(postParamters);
        //     const req = http.request(options, (res) => {
        //         res.setEncoding('utf8');
        //         let response = '';
        //         res.on('data', (chunk) => {
        //             expect(hasText(chunk, 'error')).toBe(false);
        //             response += chunk;
        //         });
        //         res.on('end', () => {
        //             const responseObject = JSON.parse(response);
        //             expect(responseObject.botConfig.id).toBeGreaterThan(0);
        //             validId = responseObject.botConfig.id;
        //             done();
        //         });
        //     });
        //     req.on('error', (e) => {
        //         throw e;
        //     });
        //     req.write(postData);
        //     req.end();
        // });

        // it('-- New botconfig missing parameters', (done) => {
        //     const options = {
        //         hostname: 'localhost',
        //         path: '/bots/update',
        //         port: 3000,
        //         method: 'POST',
        //         headers: postHeader,
        //     };
        //     const postParamters = {
        //         id: -1,
        //         name: 'Test bot 1',
        //     };
        //     const postData = JSON.stringify(postParamters);
        //     const req = http.request(options, (res) => {
        //         res.setEncoding('utf8');
        //         let response = '';
        //         res.on('data', (chunk) => {
        //             response += chunk;
        //         });
        //         res.on('end', () => {
        //             expect(hasText(response, 'error')).toBe(true);
        //             done();
        //         });
        //     });
        //     req.on('error', (e) => {
        //         throw e;
        //     });
        //     req.write(postData);
        //     req.end();
        // });
        // it('-- New botconfig no parameters', (done) => {
        //     const options = {
        //         hostname: 'localhost',
        //         path: '/bots/update',
        //         port: 3000,
        //         method: 'POST',
        //         headers: postHeader,
        //     };
        //     const postParamters = {};
        //     const postData = JSON.stringify(postParamters);
        //     const req = http.request(options, (res) => {
        //         res.setEncoding('utf8');
        //         let response = '';
        //         res.on('data', (chunk) => {
        //             response += chunk;
        //         });
        //         res.on('end', () => {
        //             expect(hasText(response, 'error')).toBe(true);
        //             done();
        //         });
        //     });
        //     req.on('error', (e) => {
        //         throw e;
        //     });
        //     req.write(postData);
        //     req.end();
        // });
        // it('-- Update past botconfig by validId', (done) => {
        //     const options = {
        //         hostname: 'localhost',
        //         path: '/bots/update',
        //         port: 3000,
        //         method: 'POST',
        //         headers: postHeader,
        //     };
        //     const postParamters = {
        //         id: validId,
        //         // new value
        //         name: 'Test bot 666',
        //         description: 'Bot made during jasmine testing of express',
        //         configuration: exampleConfig,
        //     };
        //     const postData = JSON.stringify(postParamters);
        //     const req = http.request(options, (res) => {
        //         res.setEncoding('utf8');
        //         let response = '';
        //         res.on('data', (chunk) => {
        //             response += chunk;
        //         });
        //         res.on('end', () => {
        //             expect(hasText(response, 'error')).toBe(false);
        //             const responseObject = JSON.parse(response);
        //             expect(responseObject.botConfig.name).toBe('Test bot 666');
        //             expect(responseObject.botConfig.id).toBe(validId);
        //             done();
        //         });
        //     });
        //     req.on('error', (e) => {
        //         throw e;
        //     });
        //     req.write(postData);
        //     req.end();
        // });
        // it('-- Update past botconfig non-existent id', (done) => {
        //     const options = {
        //         hostname: 'localhost',
        //         path: '/bots/update',
        //         port: 3000,
        //         method: 'POST',
        //         headers: postHeader,
        //     };
        //     const postParamters = {
        //         id: 989,
        //         // new value
        //         name: 'Test bot 666',
        //         description: 'Bot made during jasmine testing of express',
        //         configuration: exampleConfig,
        //     };
        //     const postData = JSON.stringify(postParamters);
        //     const req = http.request(options, (res) => {
        //         res.setEncoding('utf8');
        //         let response = '';
        //         res.on('data', (chunk) => {
        //             response += chunk;
        //         });
        //         res.on('end', () => {
        //             expect(hasText(response, 'error')).toBe(false);
        //             expect(response).toBe('{}');
        //             done();
        //         });
        //     });
        //     req.on('error', (e) => {
        //         throw e;
        //     });
        //     req.write(postData);
        //     req.end();
        // });
        // it('-- Update past botconfig no paramters', (done) => {
        //     const options = {
        //         hostname: 'localhost',
        //         path: '/bots/update',
        //         port: 3000,
        //         method: 'POST',
        //         headers: postHeader,
        //     };
        //     const postParamters = {};
        //     const postData = JSON.stringify(postParamters);
        //     const req = http.request(options, (res) => {
        //         res.setEncoding('utf8');
        //         let response = '';
        //         res.on('data', (chunk) => {
        //             response += chunk;
        //         });
        //         res.on('end', () => {
        //             expect(hasText(response, 'error')).toBe(true);
        //             done();
        //         });
        //     });
        //     req.on('error', (e) => {
        //         throw e;
        //     });
        //     req.write(postData);
        //     req.end();
        // });
        // it('--Recent', (done) => {
        //     const options = {
        //         url: 'http://localhost:3000/bots/recent',
        //     };
        //     request.get(options, (err, response, body) => {
        //         if (err) { throw err; }
        //         const responseObject = JSON.parse(body);
        //         expect(responseObject.botConfigs).toBeDefined();
        //         expect(responseObject.botConfigs.length).toBe(1);
        //         done();
        //     });
        // });
        // it('--All', (done) => {
        //     const options = {
        //         url: 'http://localhost:3000/bots/all',
        //     };
        //     request.get(options, (err, response, body) => {
        //         if (err) { throw err; }
        //         const responseObject = JSON.parse(body);
        //         expect(responseObject.botConfigs).toBeDefined();
        //         expect(responseObject.botConfigs.length).toBe(1);
        //         done();
        //     });
        // });
        // it('-- Get validId bot', (done) => {
        //     const options = {
        //         url: `http://localhost:3000/bots/get/${validId}`,
        //     };
        //     request.get(options, (err, response, body) => {
        //         expect(body).not.toBe('{}');
        //         expect(body).not.toBe('');
        //         if (body !== '') {
        //             const responseObject = JSON.parse(body);
        //             expect(responseObject.botConfig[0].id).toBe(validId);
        //         }
        //         done();
        //     });
        // });
        // it('-- Get bot with invalid id', (done) => {
        //     const options = {
        //         url: 'http://localhost:3000/bots/get/666',
        //     };
        //     request.get(options, (err, response, body) => {
        //         const responseObject = JSON.parse(body);
        //         expect(responseObject.botConfig.length).toBe(0);
        //         done();
        //     });
        // });
    });
});

