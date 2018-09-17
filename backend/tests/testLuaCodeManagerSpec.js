const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();
const { codeGenerator } = require('controllers/codeGeneration/LuaCodeTemplateManager.js');
const { writeScripts } = require('controllers/codeGeneration/generateScript.js');
const fs = require('fs');
const unzip = require('unzip');
const exampleObjectDefault = require('../../config/exampleConfigurationsBots/default.js');
const exampleObjectDefaultAllHeroes = require('../../config/exampleConfigurationsBots/defaultAllHeroes.js');
const exampleObjectDefaultHeroesByPos = require('../../config/exampleConfigurationsBots/defaultHeroesByPosition.js');
const exampleObjectDefaultItemsSpecified = require('../../config/exampleConfigurationsBots/defaultItemsSpecified.js');
const exampleObjectDefaultAbilitiesSpecified = require('../../config/exampleConfigurationsBots/defaultAbilitiesSpecified.js');
const exampleObjectComplexOne = require('../../config/exampleConfigurationsBots/complexOne.js');
const mocks = require('node-mocks-http');

const response = mocks.createResponse();

const id = 't100';
const botId = 't666';

describe('Lua Code Manager tests:\n', () => {
    beforeAll(() => {
    });

    beforeEach(() => {
        codeGenerator.reset();
    });

    it('test one helper function added', () => {
        codeGenerator.addHelperFunction('testHelperFunction');

        expect(codeGenerator.generate()).toBe('-- nothing to see here\n\n');
    });
    it('test two helper functions added', () => {
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction2');

        expect(codeGenerator.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\n');
    });
    it('test the same helper function added multiple times', () => {
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction');

        expect(codeGenerator.generate()).toBe('-- nothing to see here\n\n');
    });
    it('test a helper function added multiple times and another function involved', () => {
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction2');
        codeGenerator.addHelperFunction('testHelperFunction2');
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction');

        expect(codeGenerator.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\n');
    });
    it('test an API function with just a middle', () => {
        codeGenerator.addToAPIFunction('test', 'middle code');

        expect(codeGenerator.generate()).toBe('function test()\n    middle code\nend\n\n');
    });
    it('test an API function with a middle and start forwards', () => {
        codeGenerator.addToStartAPIFunction('test', 'start code');
        codeGenerator.addToAPIFunction('test', 'middle code');

        expect(codeGenerator.generate()).toBe('function test()\n    start code\n    middle code\nend\n\n');
    });
    it('test an API function with a middle and start backwards', () => {
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToStartAPIFunction('test', 'start code');

        expect(codeGenerator.generate()).toBe('function test()\n    start code\n    middle code\nend\n\n');
    });
    it('test an API function with a start, middle and end forwards', () => {
        codeGenerator.addToStartAPIFunction('test', 'start code');
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToEndAPIFunction('test', 'end code');

        expect(codeGenerator.generate()).toBe('function test()\n    start code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with a start, middle and end backwards', () => {
        codeGenerator.addToEndAPIFunction('test', 'end code');
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToStartAPIFunction('test', 'start code');

        expect(codeGenerator.generate()).toBe('function test()\n    start code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with lots of things one', () => {
        codeGenerator.addToEndAPIFunction('test', 'end code');
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToStartAPIFunction('test', 'start code');

        expect(codeGenerator.generate()).toBe('function test()\n    start code\n    middle code\n    middle code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with lots of things two', () => {
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToStartAPIFunction('test', 'start code');
        codeGenerator.addToStartAPIFunction('test', 'start code');

        codeGenerator.addToStartAPIFunction('test2', 'start code');
        codeGenerator.addToEndAPIFunction('test2', 'end code');

        expect(codeGenerator.generate()).toBe('function test()\n    start code\n    start code\n    middle code\nend\n\nfunction test2()\n    start code\n    end code\nend\n\n');
    });
    it('test an API function and helper function together', () => {
        codeGenerator.addToAPIFunction('test', 'middle code');
        codeGenerator.addToStartAPIFunction('test', 'start code');
        codeGenerator.addToStartAPIFunction('test', 'start code');

        codeGenerator.addToStartAPIFunction('test2', 'start code');
        codeGenerator.addToEndAPIFunction('test2', 'end code');

        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction2');
        codeGenerator.addHelperFunction('testHelperFunction2');
        codeGenerator.addHelperFunction('testHelperFunction');
        codeGenerator.addHelperFunction('testHelperFunction');

        expect(codeGenerator.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\nfunction test()\n    start code\n    start code\n    middle code\nend\n\nfunction test2()\n    start code\n    end code\nend\n\n');
    });
    describe('Lua code generation from object:', () => {
        const pathToFiles = path.join(process.env.NODE_PATH, '..', 'public', 'lua', id, botId);
        const pathToZip = path.join(process.env.NODE_PATH, '..', 'public', 'lua', id, `${botId}.zip`);
        const pathToTempFile = path.join(process.env.NODE_PATH, '..', 'public', 'lua', id, botId);
        const pathToExpectedOutput = path.join(process.env.NODE_PATH, '..', 'config', 'exampleConfigurationsBots', 'expectedOutput');
        console.log(pathToExpectedOutput);
        function unzipProcedure(func) {
            fs.createReadStream(pathToZip)
                .pipe(unzip.Parse())
                .on('entry', func);
        }

        it('test if appropriate folders are created', (done) => {
            writeScripts(exampleObjectDefaultAllHeroes, response, id, botId);
            const rootNodeDir = path.join(__dirname, '..', '..');
            let filePath = path.join(rootNodeDir, 'public');
            expect(fs.existsSync(filePath)).toBe(true, `${filePath} should exist`);
            filePath = path.join(filePath, 'lua');
            expect(fs.existsSync(filePath)).toBe(true, `${filePath} should exist`);
            filePath = path.join(filePath, String(id));
            expect(fs.existsSync(filePath)).toBe(true, `${filePath} should exist`);
            filePath = path.join(filePath, String(botId));
            expect(fs.existsSync(filePath)).toBe(true, `${filePath} should exist`);
            done();
        });
        it('test if zip has same files as in <botId> folder', (done) => {
            writeScripts(exampleObjectDefaultAllHeroes, response, id, botId);
            unzipProcedure((entry) => {
                const fileName = entry.path;
                if (fileName === 'team_desires.lua') {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    const originalFileDir = path.join(pathToFiles, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedOutput = fs.readFileSync(originalFileDir).toString();
                    expect(luaOutput).toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
            done();
        });
        it('test if that heroes changes specified, the hero selection file should match expected file', (done) => {
            writeScripts(exampleObjectDefaultAllHeroes, response, id, botId);
            const filePath = path.join(pathToTempFile, 'hero_selection.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            let expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_all_heroes.lua');
            let expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).toBe(expectedOutput);
            expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_by_position.lua');
            expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).not.toBe(expectedOutput);
            done();
        });
        it('test if that heroes changes specified *by position*, the hero selection file should match expected file', (done) => {
            writeScripts(exampleObjectDefaultHeroesByPos, response, id, botId);
            const filePath = path.join(pathToTempFile, 'hero_selection.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            let expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_by_position.lua');
            let expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).toBe(expectedOutput);
            expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_all_heroes.lua');
            expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).not.toBe(expectedOutput);
            done();
        });
        it('test if item changes specified, the items file should match expected file', (done) => {
            writeScripts(exampleObjectDefaultItemsSpecified, response, id, botId);
            const filePath = path.join(pathToTempFile, 'item_purchase_drow_ranger.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            const expectedFilePath = path.join(pathToExpectedOutput, 'item_purchase_drow_ranger.lua');
            const expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).toBe(expectedOutput);
            done();
        });
        it('test if ability changes specified, ability file changes accordingly', (done) => {
            writeScripts(exampleObjectDefaultAbilitiesSpecified, response, id, botId);
            const filePath = path.join(pathToTempFile, 'ability_item_usage_drow_ranger.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            const expectedFilePath = path.join(pathToExpectedOutput, 'ability_item_usage_drow_ranger.lua');
            const expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).toBe(expectedOutput);
            done();
        });
        it('test if no ability changes specified, the ability file should not match expected file', (done) => {
            writeScripts(exampleObjectDefaultAllHeroes, response, id, botId);
            const filePath = path.join(pathToTempFile, 'ability_item_usage_drow_ranger.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            const expectedFilePath = path.join(pathToExpectedOutput, 'ability_item_usage_drow_ranger.lua');
            const expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).not.toBe(expectedOutput);
            done();
        });
        it('test if no item changes specified, the items file should not match expected file', (done) => {
            writeScripts(exampleObjectDefaultAllHeroes, response, id, botId);
            const filePath = path.join(pathToTempFile, 'item_purchase_drow_ranger.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            const expectedFilePath = path.join(pathToExpectedOutput, 'item_purchase_drow_ranger.lua');
            const expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).not.toBe(expectedOutput);
            done();
        });

        it('test generation from empty/default config object', (done) => {
            // console.log(exampleObjectDefault);
            writeScripts(exampleObjectDefault, response, id, botId);
            let filePath = path.join(pathToTempFile, 'team_desires.lua');
            let luaOutput = fs.readFileSync(filePath).toString();
            let expectedFilePath = path.join(pathToExpectedOutput, 'default.lua');
            let expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).toBe(expectedOutput);
            // testing that the default hero selection file is used
            // by ensuring that it does not match any of our expected
            // hero selection outputs
            filePath = path.join(pathToTempFile, 'hero_selection.lua');
            expect(fs.existsSync(filePath)).toBe(true);
            luaOutput = fs.readFileSync(filePath).toString();
            expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_all_heroes.lua');
            expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).not.toBe(expectedOutput);
            filePath = path.join(pathToTempFile, 'hero_selection.lua');
            luaOutput = fs.readFileSync(filePath).toString();
            expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_by_position.lua');
            expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).not.toBe(expectedOutput);
            // checking if random hero .lua files exists despite not specifying heroes
            filePath = path.join(pathToTempFile, 'ability_item_usage_drow_ranger.lua');
            expect(fs.existsSync(filePath)).toBe(true);
            filePath = path.join(pathToTempFile, 'item_purchase_dazzle.lua');
            expect(fs.existsSync(filePath)).toBe(true);
            filePath = path.join(pathToTempFile, 'bot_chen.lua');
            expect(fs.existsSync(filePath)).toBe(true);
            done();
        });
        it('test generation from complex config object', (done) => {
            writeScripts(exampleObjectComplexOne, response, id, botId);
            const filePath = path.join(pathToTempFile, 'team_desires.lua');
            const luaOutput = fs.readFileSync(filePath).toString();
            const expectedFilePath = path.join(pathToExpectedOutput, 'complexOne.lua');
            const expectedOutput = fs.readFileSync(expectedFilePath).toString();
            expect(luaOutput).toBe(expectedOutput);
            done();
        });
    });
});
