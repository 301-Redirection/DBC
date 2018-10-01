/**
 *  This function uses the LuaCodeTemplateManager class to generate
 *  the code in the appropriate directory specified.
 *
 *  The directory (from the node route): public/lua/<user_id>/<bot_id>
 *
 *  TO DO: Get team_desires.lua that we generate to replace the
 *         team_desires.lua copied from the code templates
 *         (There seems to be a synchronousity issue...)
 *
 * */

const { codeGenerator } = require('./LuaCodeTemplateManager.js');
const { ConfigurationValidator } = require('./ConfigurationValidator.js');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const moment = require('moment');

const NODE_PATH = path.join(__dirname, '..', '..');

// Trigger enum
const TRIGGER = {
    Time: 1,
    EnemyHeroesAlive: 2,
    AlliedHeroesAlive: 3,
};

// Operator enum
const OPERATOR = {
    LessThan: 1,
    LessThanEqualTo: 2,
    EqualTo: 3,
    GreaterThanEqualTo: 4,
    GreaterThan: 5,
    NotEqual: 6,
};

// Action enum
const ACTION = {
    Modify: 1,
    Return: 2, // OVERRIDE
};

// Logical Operator enum
const LOGICAL_OPERTAOR = {
    AND: 1,
    OR: 2,
};

// Return a string representation of the passed logical operator
const getLogicalOperator = function (logicalOperator) {
    let operatorString = '';
    switch (logicalOperator) {
        case LOGICAL_OPERTAOR.AND:
            operatorString = 'and';
            break;
        case LOGICAL_OPERTAOR.OR:
            operatorString = 'or';
            break;
        default:
            operatorString = '';
    }
    return operatorString;
};

// Return a string representation of the passed trigger
const getTrigger = function (trigger) {
    let triggerString = '';
    switch (trigger) {
        case TRIGGER.Time:
            // Gets the game time. Matches game clock. Pauses with game pause.
            triggerString = 'DotaTime()';
            break;
        case TRIGGER.EnemyHeroesAlive:
            // Get number of enemy heroes alive
            triggerString = 'enemiesAlive';
            break;
        case TRIGGER.AlliedHeroesAlive:
            // Get number of allied heroes alive
            triggerString = 'alliesAlive';
            break;
        default:
            triggerString = '';
    }
    return triggerString;
};

// Return a string representation of the passed operator
const getOperator = function (operator) {
    let operatorString = '';
    switch (operator) {
        case OPERATOR.LessThan:
            operatorString = '<';
            break;
        case OPERATOR.LessThanEqualTo:
            operatorString = '<=';
            break;
        case OPERATOR.EqualTo:
            operatorString = '==';
            break;
        case OPERATOR.GreaterThanEqualTo:
            operatorString = '>=';
            break;
        case OPERATOR.GreaterThan:
            operatorString = '>';
            break;
        case OPERATOR.NotEqual:
            operatorString = '!=';
            break;
        default:
            operatorString = '';
    }
    return operatorString;
};

// Return a string representation of the passed action
const getAction = function (action) {
    let actionString = '';
    switch (action) {
        case ACTION.Modify:
            actionString = 'common +='; // TODO: Decide on a modify method to use
            break;
        case ACTION.Return:
            actionString = 'return';
            break;
        default:
            actionString = '';
    }
    return actionString;
};

const convertToDotaTime = function (minutes) {
    return minutes * 60;
};

// Get conditions in the compoundConditions array
const getConditions = function (compoundConditions) {
    let override = false;
    let overrideValue;
    let trigger = '';
    let operator = '';
    let logicalOperator = '';
    let scriptBuilder = '';

    compoundConditions.forEach((compound) => {
        if (compound.conditions.length > 0) {
            const { conditions } = compound;

            const action = getAction(compound.action);
            const totalValue = compound.value;
            let hasNumAlliesTrigger = false;
            let hasNumEnemiesTrigger = false;
            for (let i = 0; i < conditions.length; i += 1) {
                if (conditions[i].trigger === TRIGGER.AlliedHeroesAlive) {
                    hasNumAlliesTrigger = true;
                }
                if (conditions[i].trigger === TRIGGER.EnemyHeroesAlive) {
                    hasNumEnemiesTrigger = true;
                }
                if (conditions[i].trigger === TRIGGER.Time) {
                    conditions[i].conditional = convertToDotaTime(conditions[i].conditional);
                }
            }

            if (hasNumAlliesTrigger) {
                codeGenerator.addHelperFunction('getAlliedHeroesAlive');
                scriptBuilder += 'local alliesAlive = getAlliedHeroesAlive()\n';
            }
            if (hasNumEnemiesTrigger) {
                codeGenerator.addHelperFunction('getEnemyHeroesAlive');
                scriptBuilder += 'local enemiesAlive = getEnemyHeroesAlive()\n';
            }

            // Begin if statement for the current CompoundCondition
            scriptBuilder += 'if';
            let i = 0;
            for (i = 0; i < conditions.length; i += 1) {
                trigger = getTrigger(conditions[i].trigger);
                operator = getOperator(conditions[i].operator);

                if (action === 'return') {
                    override = true;
                    overrideValue = totalValue;
                }

                if (i < conditions.length - 1) {
                    logicalOperator = getLogicalOperator(compound.logicalOperators[i]);
                    scriptBuilder += ` (${trigger} ${operator} ${conditions[i].conditional}) ${logicalOperator}`;
                } else {
                    scriptBuilder += ` (${trigger} ${operator} ${conditions[i].conditional}) then\n`;

                    if (override === false) {
                        scriptBuilder += `    ${action} ${totalValue}\n`;
                    } else {
                        scriptBuilder += `    common = ${overrideValue}\n`;
                    }
                }
            }
            scriptBuilder += 'end\n';
        }
    });
    return scriptBuilder;
};

// Generate roshan desires
const generateRoshanDesires = function (req) {
    const { roshan } = req.body.configuration.desires;
    let scriptBuilder = '';
    scriptBuilder += `local common = ${roshan.initialValue}\n`;
    scriptBuilder += getConditions(roshan.compoundConditions);
    scriptBuilder += 'return common';
    return scriptBuilder;
};

// Generate roam desires
const generateRoamDesires = function (req) {
    const { roam } = req.body.configuration.desires;
    let scriptBuilder = '';
    scriptBuilder += `local common = ${roam.initialValue}\n`;
    scriptBuilder += getConditions(roam.compoundConditions);
    scriptBuilder += 'return common';
    return scriptBuilder;
};

// Generic function for generating lane desires, with a
const generateLaneDesires = function (reqType) {
    const { top, mid, bot } = reqType;
    let scriptBuilder = '';
    scriptBuilder += `local common = ${top.initialValue}\n`;
    scriptBuilder += getConditions(top.compoundConditions);
    scriptBuilder += 'local topCommon = common\n\n';

    scriptBuilder += `common = ${mid.initialValue}\n`;
    scriptBuilder += getConditions(mid.compoundConditions);
    scriptBuilder += 'local midCommon = common\n\n';

    scriptBuilder += `common = ${bot.initialValue}\n`;
    scriptBuilder += getConditions(bot.compoundConditions);
    scriptBuilder += 'local botCommon = common\n\n';

    scriptBuilder += 'return {topCommon, midCommon, botCommon}';
    return scriptBuilder;
};

/**
 * Generate the Lua script for team desires
 * -- used LCM functions, changed to codeGenerator because it "has-a" LCM
 * -- and hence uses those functions of codeGenerator
 */
const generateTeamDesires = function (req) {
    // Reset helperFunction and APIFunction objects
    codeGenerator.reset();

    // Adds the script name and the description as a comment at the top of the file
    const { name, description } = req.body;
    const scriptHeader = `-- ${name} --\n[[ ${description} ]]`;
    codeGenerator.addScriptHeading(
        'NameAndDescription',
        scriptHeader
    );

    // Creates the UpdateRoshanDesire function
    codeGenerator.addToAPIFunction(
        'UpdateRoshaneDesires',
        generateRoshanDesires(req)
    );

    // Creates the UpdateRoamDesire function
    codeGenerator.addToAPIFunction(
        'UpdateRoamDesires',
        generateRoamDesires(req)
    );

    // Creates the UpdatePushLaneDesires function
    codeGenerator.addToAPIFunction(
        'UpdatePushLaneDesires',
        generateLaneDesires(req.body.configuration.desires.push)
    );

    // Creates the UpdateDefendLaneDesires function
    codeGenerator.addToAPIFunction(
        'UpdateDefendLaneDesires',
        generateLaneDesires(req.body.configuration.desires.defend)
    );

    // Creates the UpdateFarmLaneDesires function
    codeGenerator.addToAPIFunction(
        'UpdateFarmLaneDesires',
        generateLaneDesires(
            req.body.configuration.desires.farm,
            'UpdateFarmLaneDesires()'
        )
    );
    return codeGenerator;
};

/**
 *  Will return the user's public directory
 *
 *  Note: If Public/Lua/{id} does not exist in the root,
 *  the folders will be created in that order
 *
 */
const getBotScriptDirectory = function (id, botId) {
    let strId = String(id);
    let strBotId = String(botId);
    strId = strId.replace('|', '_');
    strBotId = strBotId.replace('|', '_');
    let publicPath = path.join(NODE_PATH, 'public');
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }
    publicPath = path.join(publicPath, 'lua');
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }
    publicPath = path.join(publicPath, strId);
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }
    const tempDir = path.join(publicPath, strBotId);
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    return publicPath;
};

/**
 *  This is the function that does the code generation
 *  via the Lua Code Manager Objects.
 *
 *  TO DO: Get team_desires.lua that we generate to replace the
 *         team_desires.lua copied from the code templates
 *         (There seems to be a synchronousity issue...)
 *
 *  The function takes the code at the specific folder
 *  and then joins it in a zip file for download by the download
 *  route specified in index.js
 *
 * */
const writeScripts = function (req, res, id, botId) {
    ConfigurationValidator.validate(req.body);
    // console.log(req.body.configuration.desires.push.top.compoundConditions[0]);
    const directory = getBotScriptDirectory(id, botId);
    const tempDir = path.join(directory, String(botId));
    codeGenerator.setPath(tempDir);
    codeGenerator.generateBotScripts(req.body.configuration, () => {
        const luaCodeManager = generateTeamDesires(req);
        const luaCodeString = luaCodeManager.generate();
        const tempPath = path.join(tempDir, 'team_desires.lua');
        fs.writeFileSync(tempPath, luaCodeString, { flag: 'w+' });

        const zipDir = path.join(directory, `${botId}.zip`);
        const output = fs.createWriteStream(zipDir);
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Sets the compression level.
        });
        // good practice to catch this error explicitly
        archive.on('error', (err) => {
            throw err;
        });
        // pipe archive data to the file
        archive.pipe(output);
        // append files from stream
        archive.directory(tempDir, '');
        archive.finalize();
    });
};

const shouldRegenerateBotScripts = function (id, botId, timeLastUpdated) {
    let publicPath = path.join(NODE_PATH, 'public');
    if (!fs.existsSync(publicPath)) {
        return true;
    }
    publicPath = path.join(publicPath, 'lua');
    if (!fs.existsSync(publicPath)) {
        return true;
    }
    publicPath = path.join(publicPath, id);
    if (!fs.existsSync(publicPath)) {
        return true;
    }
    publicPath = path.join(publicPath, String(botId));
    if (!fs.existsSync(publicPath)) {
        return true;
    }
    publicPath += '.zip';
    try {
        const stats = fs.stat(publicPath);
        return moment(timeLastUpdated).isAfter(stats.mtime);
    } catch (err) {
        return true; // signal to create the "missing" script
    }
};

module.exports = {
    generateTeamDesires,
    generateRoshanDesires,
    generateRoamDesires,
    generateLaneDesires,
    getConditions,
    getTrigger,
    getOperator,
    getAction,
    getLogicalOperator,
    writeScripts,
    shouldRegenerateBotScripts,
    getBotScriptDirectory,
};
