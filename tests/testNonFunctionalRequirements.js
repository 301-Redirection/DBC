/**
 *  This file is used to time how long it takes to generate the bot scripts from
 *  the example objects to
 *
 */
const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../backend');
require('module').Module._initPaths();
const mocks = require('node-mocks-http');
const exampleObjectDefault = require('../config/exampleConfigurationsBots/default.js');
const exampleObjectDefaultAllHeroes = require('../config/exampleConfigurationsBots/defaultAllHeroes.js');
const exampleObjectDefaultHeroesByPos = require('../config/exampleConfigurationsBots/defaultHeroesByPosition.js');
const exampleObjectDefaultItemsSpecified = require('../config/exampleConfigurationsBots/defaultItemsSpecified.js');
const exampleObjectDefaultAbilitiesSpecified = require('../config/exampleConfigurationsBots/defaultAbilitiesSpecified.js');
const exampleObjectComplexOne = require('../config/exampleConfigurationsBots/complexOne.js');
const { writeScripts } = require('../backend/controllers/codeGeneration/generateScript.js');

const response = mocks.createResponse();
const id = 'timing';
const botId = 'test';

let start = process.hrtime();

function elapsedTime() {
    // 3 decimal places
    const precision = 3;
    // divide by a million to get nano seconds to milliseconds
    const elapsed = process.hrtime(start)[1] / 1000000;
    const fixedPrecisionTimeElapsed = elapsed.toFixed(precision);
    start = process.hrtime(); // reset the timer
    return fixedPrecisionTimeElapsed;
}
describe('Non-functional requirements testing', () => {
    // creating a bot in a valid way
    it('-- time for each must be under 10 seconds', (done) => {
        const objectsToTime = [
            exampleObjectDefault,
            exampleObjectDefaultAllHeroes,
            exampleObjectDefaultHeroesByPos,
            exampleObjectDefaultItemsSpecified,
            exampleObjectDefaultAbilitiesSpecified,
            exampleObjectComplexOne,
        ];
        // writeScripts(objectsToTime[0], response, id, `timing_${botId}`);
        objectsToTime.forEach((object) => {
            start = process.hrtime();
            writeScripts(object, response, id, `${botId}`);
            const time = elapsedTime();
            expect(time).toBeLessThan(3000);
        });

        done();
    });
});
