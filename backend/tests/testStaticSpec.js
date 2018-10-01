const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../');
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

                expect(responseObject.items.length).toBeGreaterThan(200);

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
                expect(responseObject.heroes.length).toBeGreaterThan(2);
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
        it('-- Invalid hero image', (done) => {
            const options = {
                url: 'http://localhost:3000/static/items/images/noetuhoentu',
            };
            request.get(options, (err, response) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
        it('-- Blank hero image', (done) => {
            const options = {
                url: 'http://localhost:3000/static/items/images/',
            };
            request.get(options, (err, response) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});

