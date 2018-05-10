const LuaHelperFunctionInterpreter = require("./LuaHelperFunctionInterpreter.js");

const LuaCodeManager = function() {
    this.helperFunctions = {};
    this.APIFunctions = {};

    this.addHelperFunction = function(functionName) {
        if(!this.helperFunctions.hasOwnProperty(functionName)) {
            this.helperFunctions[functionName] = LuaHelperFunctionInterpreter.getFunction(functionName);
        }
    }

    this.addToAPIFunction = function(functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].middle += luaString;
    }

    this.addToStartAPIFunction = function(functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].start += luaString;
    }

    this.addToEndAPIFunction = function(functionName, luaString) {
        this.checkAPIExistence(functionName);
        this.APIFunctions[functionName].start += luaString;
    }

    this.checkAPIExistence = function(functionName) {
        if(!this.APIFunctions.hasOwnProperty(functionName)) {
            this.APIFunctions[functionName] = {start: "", middle: "", end: ""};
        }
    }
}
lcm = new LuaCodeManager();

module.exports.lcm = lcm;