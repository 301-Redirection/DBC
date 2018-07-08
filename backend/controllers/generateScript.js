const { lcm } = require('./LuaCodeManager.js');
const { templateGenerator } = require('./TemplateBasedGenerator.js');
const fs = require('fs');
const archiver = require('archiver');

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

// Get conditions in the compoundConditions array
const getConditions = function (compoundConditions) {
    let override = false;
    let overrideValue;
    let trigger = '';
    let operator = '';
    let action = '';
    let logicalOperator = '';
    let scriptBuilder = '';

    compoundConditions.forEach((compound) => {
        if (compound.conditions.length > 0) {
            const { conditions } = compound;

            let hasNumAlliesTrigger = false;
            let hasNumEnemiesTrigger = false;
            for (let i = 0; i < conditions.length; i += 1) {
                if (conditions[i].trigger === TRIGGER.AlliedHeroesAlive) {
                    hasNumAlliesTrigger = true;
                }
                if (conditions[i].trigger === TRIGGER.EnemyHeroesAlive) {
                    hasNumEnemiesTrigger = true;
                }
            }

            if (hasNumAlliesTrigger) {
                lcm.addHelperFunction('getAlliedHeroesAlive');
                scriptBuilder += 'local alliesAlive = getAlliedHeroesAlive()\n';
            }
            if (hasNumEnemiesTrigger) {
                lcm.addHelperFunction('getEnemyHeroesAlive');
                scriptBuilder += 'local enemiesAlive = getEnemyHeroesAlive()\n';
            }

            // Begin if statement for the current CompoundCondition
            scriptBuilder += 'if';
            let totalValue = 0;
            let i = 0;
            for (i = 0; i < conditions.length; i += 1) {
                trigger = getTrigger(conditions[i].trigger);
                operator = getOperator(conditions[i].operator);
                action = getAction(conditions[i].action);
                totalValue += conditions[i].value;

                if (action === 'return') {
                    override = true;
                    overrideValue = conditions[i].value;
                }

                if (i < conditions.length - 1) {
                    logicalOperator = getLogicalOperator(compound.logicalOperator[i]);
                    scriptBuilder += ` (${trigger} ${operator} ${conditions[i].conditional}) ${logicalOperator}`;
                } else {
                    scriptBuilder += ` (${trigger} ${operator} ${conditions[i].conditional}) then\n`;

                    if (override === false) {
                        scriptBuilder += `    ${action} ${totalValue / conditions.length}\n`;
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
    const { roshan } = req.body.configuration;
    let scriptBuilder = '';
    scriptBuilder += `local common = ${roshan.initialValue}\n`;
    scriptBuilder += getConditions(roshan.compoundConditions);
    scriptBuilder += 'return common';
    return scriptBuilder;
};

// Generate roam desires
const generateRoamDesires = function (req) {
    const { roam } = req.body.configuration;
    let scriptBuilder = '';
    scriptBuilder += `local common = ${roam.initialValue}\n`;
    scriptBuilder += getConditions(roam.compoundConditions);
    scriptBuilder += 'return {common, GetTeamMember(((GetTeam() == TEAM_RADIANT) ? TEAM_RADIANT : TEAM_DIRE), RandomInt(1, 5))}';
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
const generateTemplateFiles = function(req) {

}

// Generate the Lua script for team desires
const generateTeamDesires = function (req) {
    // Reset helperFunction and APIFunction objects
    lcm.reset();

    // Adds the script name and the description as a comment at the top of the file
    const { name, description } = req.body;
    const scriptHeader = `-- ${name} --\n[[ ${description} ]]`;
    lcm.addScriptHeading(
        'NameAndDescription',
        scriptHeader
    );

    // Creates the UpdateRoshanDesire function
    lcm.addToAPIFunction(
        'UpdateRoshaneDesires',
        generateRoshanDesires(req)
    );

    // Creates the UpdateRoamDesire function
    lcm.addToAPIFunction(
        'UpdateRoamDesires',
        generateRoamDesires(req)
    );

    // Creates the UpdatePushLaneDesires function
    lcm.addToAPIFunction(
        'UpdatePushLaneDesires',
        generateLaneDesires(req.body.configuration.push)
    );

    // Creates the UpdateDefendLaneDesires function
    lcm.addToAPIFunction(
        'UpdateDefendLaneDesires',
        generateLaneDesires(req.body.configuration.defend)
    );

    // Creates the UpdateFarmLaneDesires function
    lcm.addToAPIFunction(
        'UpdateFarmLaneDesires',
        generateLaneDesires(
            req.body.configuration.farm,
            'UpdateFarmLaneDesires()'
        )
    );
    return lcm;
};


// Generates the bot TeamDesires script
const writeScripts = function (req, id) {
    let luaCodeString = '';
    const luaCodeManager = generateTeamDesires(req);
    luaCodeString = luaCodeManager.generate();

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
    fs.writeFileSync(`./Lua/${id}/team_desires.lua`, luaCodeString, { flag: 'w+' });

    const output = fs.createWriteStream(`./Lua/${id}.zip`);
    const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
    });

    // good practice to catch this error explicitly
    archive.on('error', (err) => {
        throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append a file from stream
    const teamDesires = `./Lua/${id}/team_desires.lua`;
    archive.append(fs.createReadStream(teamDesires), { name: 'team_desires.lua' });

    archive.finalize();
};

module.exports = {
    templateGenerator.()
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
};
