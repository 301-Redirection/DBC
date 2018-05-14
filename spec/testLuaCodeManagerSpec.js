const { lcm } = require('../server/LuaCodeManager.js');
const { writeScripts } = require('../server/generateScript.js');
const fs = require('fs');
const exampleObjectDefault = require('../config/exampleConfigurationsBots/default.js');
const exampleObjectComplexOne = require('../config/exampleConfigurationsBots/complexOne.js');

const id = 't100';

describe('Lua Code Manager tests', () => {
    beforeEach(() => {
        lcm.reset();
    });

    it('test one helper function added', () => {
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n');
    });
    it('test two helper functions added', () => {
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction2');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\n');
    });
    it('test the same helper function added multiple times', () => {
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n');
    });
    it('test a helper function added multiple times and another function involved', () => {
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\n');
    });
    it('test an API function with just a middle', () => {
        lcm.addToAPIFunction('test', 'middle code');

        expect(lcm.generate()).toBe('function test()\n    middle code\nend\n\n');
    });
    it('test an API function with a middle and start forwards', () => {
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToAPIFunction('test', 'middle code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\nend\n\n');
    });
    it('test an API function with a middle and start backwards', () => {
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\nend\n\n');
    });
    it('test an API function with a start, middle and end forwards', () => {
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToEndAPIFunction('test', 'end code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with a start, middle and end backwards', () => {
        lcm.addToEndAPIFunction('test', 'end code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with lots of things one', () => {
        lcm.addToEndAPIFunction('test', 'end code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\n    middle code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with lots of things two', () => {
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToStartAPIFunction('test', 'start code');

        lcm.addToStartAPIFunction('test2', 'start code');
        lcm.addToEndAPIFunction('test2', 'end code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    start code\n    middle code\nend\n\nfunction test2()\n    start code\n    end code\nend\n\n');
    });
    it('test an API function and helper function together', () => {
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToStartAPIFunction('test', 'start code');

        lcm.addToStartAPIFunction('test2', 'start code');
        lcm.addToEndAPIFunction('test2', 'end code');

        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\nfunction test()\n    start code\n    start code\n    middle code\nend\n\nfunction test2()\n    start code\n    end code\nend\n\n');
    });
    describe('Lua code generation from object:', () => {
        it('test generation from empty/default config object', () => {
            writeScripts(exampleObjectDefault, id);

            try {
                fs.mkdirSync('./Lua');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            try {
                fs.mkdirSync(`./Lua/${id}`);
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            const luaOutput = fs.readFileSync(`./Lua/${id}/team_desires.lua`).toString();

            try {
                fs.mkdirSync('./config');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            try {
                fs.mkdirSync('./config/exampleConfigurationsBots');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            try {
                fs.mkdirSync('./config/exampleConfigurationsBots/expectedOutput');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            const expectedOutput = fs.readFileSync('./config/exampleConfigurationsBots/expectedOutput/default.lua').toString();
            expect(luaOutput).toBe(expectedOutput);
        });
        it('test generation from complex config object', () => {
            // writeScripts(exampleObjectComplexOne, -100);
            writeScripts(exampleObjectComplexOne, id);

            try {
                fs.mkdirSync('./Lua');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            try {
                fs.mkdirSync(`./Lua/${id}`);
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            const luaOutput = fs.readFileSync(`./Lua/${id}/team_desires.lua`).toString();

            try {
                fs.mkdirSync('./config');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            try {
                fs.mkdirSync('./config/exampleConfigurationsBots');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            try {
                fs.mkdirSync('./config/exampleConfigurationsBots/expectedOutput');
            } catch (err) {
                if (err.code !== 'EEXIST') throw err;
            }

            const expectedOutput = fs.readFileSync('./config/exampleConfigurationsBots/expectedOutput/complexOne.lua').toString();
            expect(luaOutput).toBe(expectedOutput);
        });
    });
});
