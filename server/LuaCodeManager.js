const lhfi = require('./LuaHelperFunctionInterpreter.js');

const LuaCodeManager = function () {
    this.helperFunctions = {};
    this.APIFunctions = {};

    this.addHelperFunction = function (functionName) {
        if (!Object.prototype.hasOwnProperty.call(this.helperFunctions, functionName)) {
            this.helperFunctions[functionName] = lhfi.getFunction(functionName);
        }
    };

    this.addToAPIFunction = function (functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].middle += luaString;
    };

    this.addToStartAPIFunction = function (functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].start += luaString;
    };

    this.addToEndAPIFunction = function (functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].start += luaString;
    };

    this.checkAPIExistence = function (functionName) {
        if (!Object.prototype.hasOwnProperty.call(this.APIFunctions, functionName)) {
            this.APIFunctions[functionName] = { start: '', middle: '', end: '' };
        }
    };
};
const lcm = new LuaCodeManager();

module.exports.lcm = lcm;
