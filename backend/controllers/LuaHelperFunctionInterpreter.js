const fs = require('fs');
const path = require('path');

// const contents = fs.readFileSync(process.env.NODE_PATH + 'lua/helperFunctions.lua').toString();
// const contents = fs.readFileSync(path.join(process.env.NODE_PATH, 'lua/helperFunctions.lua')).toString();

// const helperFunctions = {};

// const functionStrings = contents.split('--**');
// functionStrings.forEach((f) => {
//     const parts = f.split('**--\n');
//     if (parts.length === 2) {
//         helperFunctions[parts[0]] = parts[1].trim();
//     }
// });

const getFunction = function (functionName) {
    if (Object.prototype.hasOwnProperty.call(helperFunctions, functionName)) {
        return helperFunctions[functionName];
    }
    throw new Error(`The function ${functionName} doesn't exist.`);
};

module.exports.getFunction = getFunction;
