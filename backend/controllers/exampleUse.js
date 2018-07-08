// const { codeGenerator } = require('./LuaCodeTemplateManager.js');
const { writeScripts } = require('./generateScript.js');

const items = ['item_slippers',
    'item_circlet',
    'item_recipe_wraith_band',
    'item_tango'];

const input = {
    abilities: 'qweqqrewqetnqrnt', talents: ['l', 'r', 'l', 'l'],
};
// const heroes1 = {
//     partitioned: 'false',
//     pool: [
//             'drow_ranger',
//             'bane',
//             'alchemist',
//             'abaddon',
//             'antimage',
//             'axe',
//             'bloodseeker',
//             'centaur',
//             'chen',
//             'chaos_knight',
//             'crystal_maiden',
//         ],
// };
const heroes2 = {
    partitioned: 'true',
    pool: [
        [
            'drow_ranger',
            'bane',
            'alchemist',
        ],
        [
            'abaddon',
            'antimage',
        ],
        [
            'axe',
            'bloodseeker',
        ],
        [
            'centaur',
            'chen',
        ],
        [
            'chaos_knight',
            'crystal_maiden',
        ],
    ],
};
const configObject = {
    heroPool: heroes2,
    heroes: {
        drow_ranger: {
            abilities: input,
            items,
        },
    },
    desires: {
        push: {
            top: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            mid: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            bot: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
        },
        farm: {
            top: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            mid: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            bot: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
        },
        defend: {
            top: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            mid: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            bot: {
                conditions: [],
                logicalOperator: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
        },
        roam: {
            conditions: [],
            logicalOperator: [],
            compoundConditions: [],
            initialValue: 0.5,
        },
        roshan: {
            conditions: [],
            logicalOperator: [],
            compoundConditions: [],
            initialValue: 0.5,
        },
    },
    name: 'yay',
    description: 'boo',
};
const officialRequest = {
    body: {
        configuration: configObject,
    },
};

writeScripts(officialRequest, '_____', 2);

// codeGenerator.generateBotScripts(configObject);
// codeGenerator.generateBotScripts(configObject);
