const lhfi = require('./LuaHelperFunctionInterpreter.js');

const indentString = function (string, numSpaces) {
    const lines = string.split('\n');
    const indentCharacter = Array(numSpaces + 1).join(' ');
    let newLines = '';

    lines.forEach((line) => {
        newLines += `${indentCharacter}${line}\n`;
    });
    return newLines;
};

const LuaCodeManager = function () {
    this.helperFunctions = {};
    this.APIFunctions = {};
    this.scriptHeadings = {};

    this.addScriptHeading = function (headingName, luaString) {
        if (!Object.prototype.hasOwnProperty.call(this.scriptHeadings, headingName)) {
            this.scriptHeadings[headingName] = luaString;
        }
    };

    this.addHelperFunction = function (functionName) {
        if (!Object.prototype.hasOwnProperty.call(this.helperFunctions, functionName)) {
            this.helperFunctions[functionName] = lhfi.getFunction(functionName);
        }
    };

    this.addToAPIFunction = function (functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].middle += indentString(luaString, 4);
    };

    this.addToStartAPIFunction = function (functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].start += indentString(luaString, 4);
    };

    this.addToEndAPIFunction = function (functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].end += indentString(luaString, 4);
    };

    this.checkAPIExistence = function (functionName) {
        if (!Object.prototype.hasOwnProperty.call(this.APIFunctions, functionName)) {
            this.APIFunctions[functionName] = { start: '', middle: '', end: '' };
        }
    };

    this.generate = function () {
        let luaCodeString = '';

        Object.keys(this.scriptHeadings).forEach((key) => {
            luaCodeString += `${this.scriptHeadings[key]}\n\n`;
        });

        Object.keys(this.helperFunctions).forEach((key) => {
            luaCodeString += `${this.helperFunctions[key]}\n\n`;
        });

        Object.keys(this.APIFunctions).forEach((key) => {
            luaCodeString += `function ${key}()\n`;
            if (this.APIFunctions[key].start !== '') {
                luaCodeString += this.APIFunctions[key].start;
            }
            if (this.APIFunctions[key].middle !== '') {
                luaCodeString += this.APIFunctions[key].middle;
            }
            if (this.APIFunctions[key].end !== '') {
                luaCodeString += this.APIFunctions[key].end;
            }
            luaCodeString += 'end\n\n';
        });

        return luaCodeString;
    };

    this.reset = function () {
        this.helperFunctions = { };
        this.APIFunctions = { };
        this.scriptHeadings = { };
    };
};
const lcm = new LuaCodeManager();

module.exports.lcm = lcm;
