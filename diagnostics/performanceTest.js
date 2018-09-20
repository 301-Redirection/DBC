/* eslint-disable no-console */
/**
 *  This file is used to time how long it takes to generate the bot scripts from
 *  the example objects to
 *
 */
const path = require('path');

process.env.NODE_PATH = path.join(__dirname, '..', 'backend');
const exampleObjectDefault = require('../config/exampleConfigurationsBots/default.js');
const exampleObjectDefaultAllHeroes = require('../config/exampleConfigurationsBots/defaultAllHeroes.js');
const exampleObjectDefaultHeroesByPos = require('../config/exampleConfigurationsBots/defaultHeroesByPosition.js');
const exampleObjectDefaultItemsSpecified = require('../config/exampleConfigurationsBots/defaultItemsSpecified.js');
const exampleObjectDefaultAbilitiesSpecified = require('../config/exampleConfigurationsBots/defaultAbilitiesSpecified.js');
const exampleObjectComplexOne = require('../config/exampleConfigurationsBots/complexOne.js');
const { writeScripts } = require('../backend/controllers/codeGeneration/generateScript.js');
const mocks = require('node-mocks-http');

const response = mocks.createResponse();
const id = 'timing';
const botId = 'test';

let start = process.hrtime();
function elapsedTime(statement) {
    // 3 decimal places
    const precision = 3;
    // divide by a million to get nano seconds to milliseconds
    const elapsed = process.hrtime(start)[1] / 1000000;
    const startTime = process.hrtime(start)[0];
    const fixedPrecisionTimeElapsed = elapsed.toFixed(precision);
    console.log(`${startTime} s, ${fixedPrecisionTimeElapsed} ms - ${statement}`);
    start = process.hrtime(); // reset the timer
}

const objectsToTime = {
    exampleObjectDefault,
    exampleObjectDefaultAllHeroes,
    exampleObjectDefaultHeroesByPos,
    exampleObjectDefaultItemsSpecified,
    exampleObjectDefaultAbilitiesSpecified,
    exampleObjectComplexOne,
};
start = process.hrtime();
if (objectsToTime) {
    console.log(Object.entries(objectsToTime));
    Object.entries(objectsToTime).forEach((object) => {
        const propName = object[0];
        const value = object[1];
        writeScripts(value, response, id, `${botId}_${propName}`);
        elapsedTime(`writeScripts -> ${propName}`);
    });
}

