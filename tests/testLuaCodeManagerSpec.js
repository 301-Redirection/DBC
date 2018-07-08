const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../backend');
require('module').Module._initPaths();
const { codeGenerator } = require('controllers/LuaCodeTemplateManager.js');
const { writeScripts } = require('controllers/generateScript.js');
const fs = require('fs');
const unzip = require('unzip');
const exampleObjectDefault = require('../config/exampleConfigurationsBots/default.js');
const exampleObjectDefaultAllHeroes = require('../config/exampleConfigurationsBots/defaultAllHeroes.js');
const exampleObjectDefaultHeroesByPos = require('../config/exampleConfigurationsBots/defaultHeroesByPosition.js');
const exampleObjectDefaultItemsSpecified = require('../config/exampleConfigurationsBots/defaultItemsSpecified.js');
const exampleObjectDefaultAbilitiesSpecified = require('../config/exampleConfigurationsBots/defaultAbilitiesSpecified.js');
const exampleObjectComplexOne = require('../config/exampleConfigurationsBots/complexOne.js');

const id = 't100';
const botId = '666';

describe('Lua Code Manager tests', () => {
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
        const pathToFiles = path.join(process.env.NODE_PATH, '..', 'Public', 'Lua', id, botId);
        const pathToZip = path.join(process.env.NODE_PATH, '..', 'Public', 'Lua', id, `${botId}.zip`);
        const pathToTempFile = path.join(process.env.NODE_PATH, '..', 'Public', 'Lua', id);
        const pathToExpectedOutput = path.join('config','exampleConfigurationsBots','expectedOutput');

        it('test if zip has same files as in <botId> folder', () => {
            writeScripts(exampleObjectDefaultAllHeroes, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "team_desires.lua") {
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
        });
        it('test if that heroes changes specified, the hero selection file should match expected file', () => {
            writeScripts(exampleObjectDefaultAllHeroes, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "hero_selection.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    let expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_all_heroes.lua');
                    let expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).toBe(expectedOutput);
                    expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_by_position.lua');
                    expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).not.toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
        it('test if that heroes changes specified by position, the hero selection file should match expected file', () => {
            writeScripts(exampleObjectDefaultHeroesByPos, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "hero_selection.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    let expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_by_position.lua');
                    let expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).toBe(expectedOutput);
                    expectedFilePath = path.join(pathToExpectedOutput, 'hero_selection_all_heroes.lua');
                    expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).not.toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
        it('test if item changes specified, the items file should match expected file', () => {
            writeScripts(exampleObjectDefaultItemsSpecified, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "item_purchase_drow_ranger.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedFilePath = path.join(pathToExpectedOutput, fileName);
                    const expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
        it('test if no ability changes specified, the ability file should not match expected file', () => {
            writeScripts(exampleObjectDefaultAllHeroes, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type; 
                const size = entry.size;
                if (fileName === "ability_usage_drow_ranger.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedFilePath = path.join(pathToExpectedOutput, fileName);
                    const expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).not.toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
        it('test if no item changes specified, the items file should not match expected file', () => {
            writeScripts(exampleObjectDefaultAllHeroes, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "item_purchase_drow_ranger.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedFilePath = path.join(pathToExpectedOutput, fileName);
                    const expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).not.toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
        it('test if ability specified changes abilities of hero accordingly', () => {
            writeScripts(exampleObjectDefaultAbilitiesSpecified, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type; // 'Directory' or 'File' 
                const size = entry.size;
                if (fileName === "ability_usage_drow_ranger.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedFilePath = path.join(pathToExpectedOutput, fileName);
                    const expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
        it('test if item changes specified, the items file should match expected file', () => {
            writeScripts(exampleObjectDefaultItemsSpecified, id, botId);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "item_purchase_drow_ranger.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedFilePath = path.join(pathToExpectedOutput, fileName);
                    const expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });


        it('test generation from empty/default config object', () => {
            writeScripts(exampleObjectDefault, id, botId);

            const luaOutput = fs.readFileSync(`./Public/Lua/${id}/team_desires.lua`).toString();

            const expectedOutput = fs.readFileSync('./config/exampleConfigurationsBots/expectedOutput/default.lua').toString();
            expect(luaOutput).toBe(expectedOutput);
        });
        it('test generation from complex config object', () => {
            writeScripts(exampleObjectComplexOne, id);
            fs.createReadStream(pathToZip)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type;
                const size = entry.size;
                if (fileName === "team_desires.lua") {
                    const extractedFileDir = path.join(pathToTempFile, fileName);
                    entry.pipe(fs.createWriteStream(extractedFileDir));
                    const luaOutput = fs.readFileSync(extractedFileDir).toString();
                    const expectedFilePath = path.join(pathToExpectedOutput, fileName);
                    const expectedOutput = fs.readFileSync(expectedFilePath).toString();
                    expect(luaOutput).toBe(expectedOutput);
                } else {
                    entry.autodrain();
                }
            });
        });
    });
});
