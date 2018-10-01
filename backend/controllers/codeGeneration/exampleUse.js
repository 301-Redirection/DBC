// const path = require('path');
// process.env.NODE_PATH = path.join(__dirname, '..');
// require('module').Module._initPaths();
// const { writeScripts, shouldRegenerateBotScripts } = require('./generateScript.js');
const { writeScripts } = require('./generateScript.js');
const mocks = require('node-mocks-http');

const items = [
    {
        name: 'dagon_5',
        components: [
            {
                name: 'dagon_4',
                components: [
                    {
                        name: 'dagon_3',
                        components: [
                            {
                                name: 'dagon_2',
                                components: [
                                    {
                                        name: 'dagon_recipe',
                                        components: [
                                            {
                                                name: 'null_talisman',
                                                components: [
                                                    {
                                                        name: 'mantle',
                                                        components: [],
                                                    },
                                                    {
                                                        name: 'circlet',
                                                        components: [],
                                                    },
                                                ],
                                            },
                                            {
                                                name: 'staff_of_wizardry',
                                                components: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'lame',
        components: [],
    },
    {
        name: 'dagon_2',
        components: [
            {
                name: 'dagon_1',
                components: [
                    {
                        name: 'recipe_null_talisman',
                        components: [
                            {
                                name: 'mantle',
                                components: [],
                            },
                            {
                                name: 'circlet',
                                components: [],
                            },
                        ],
                    },
                    {
                        name: 'staff_of_wizardry',
                        components: [],
                    },
                ],
            },
        ],
    },
];

const input = {
    abilities: 'qweqqrewqetnqrnt',
    talents: ['l', 'r', 'l', 'l'],
    items,
};
// const heroes1 = {
//     partitioned: false,
//     pool: [
//         {
//             name: 'drow_ranger',
//             position: -1,
//         },
//         {
//             name: 'bane',
//             position: -1,
//         },
//         {
//             name: 'alchemist',
//             position: -1,
//         },
//         {
//             name: 'abaddon',
//             position: -1,
//         },
//         {
//             name: 'antimage',
//             position: -1,
//         },
//         {
//             name: 'axe',
//             position: -1,
//         },
//         {
//             name: 'bloodseeker',
//             position: -1,
//         },
//         {
//             name: 'centaur',
//             position: -1,
//         },
//         {
//             name: 'chen',
//             position: -1,
//         },
//         {
//             name: 'chaos_knight',
//             position: -1,
//         },
//         {
//             name: 'crystal_maiden',
//             position: -1,
//         },
//     ],
// };
const heroes2 = {
    partitioned: true,
    pool: [
        {
            name: 'drow_ranger',
            position: 1,
        },
        {
            name: 'bane',
            position: 1,
        },
        {
            name: 'alchemist',
            position: 1,
        },
        {
            name: 'abaddon',
            position: 2,
        },
        {
            name: 'antimage',
            position: 2,
        },
        {
            name: 'axe',
            position: 3,
        },
        {
            name: 'bloodseeker',
            position: 3,
        },
        {
            name: 'centaur',
            position: 4,
        },
        {
            name: 'chen',
            position: 4,
        },
        {
            name: 'chaos_knight',
            position: 5,
        },
        {
            name: 'crystal_maiden',
            position: 5,
        },
    ],
};
const configObject = {
    heroPool: heroes2,
    heroes: [
        {
            name: 'drow_ranger',
            abilities: input,
            items,
        },
        {
            name: 'chen',
            abilities: input,
            items,
        },
        {
            name: 'crystal_maiden',
            abilities: null,
            input: null,
        },
        {
            name: 'chaos_knight',
        },
        {
            name: 'centaur',
        },
        {
            name: 'chen',
        },
        {
            name: 'bloodseeker',
        },
        {
            name: 'antimage',
        },
        {
            name: 'abaddon',
        },
        {
            name: 'alchemist',
        },
        {
            name: 'bane',
        },
    ],
    desires: {
        push: {
            top: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            mid: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            bot: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
        },
        farm: {
            top: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            mid: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            bot: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
        },
        defend: {
            top: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            mid: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
            bot: {
                conditions: [],
                logicalOperators: [],
                compoundConditions: [],
                initialValue: 0.5,
            },
        },
        roam: {
            conditions: [],
            logicalOperators: [],
            compoundConditions: [],
            initialValue: 0.5,
        },
        roshan: {
            conditions: [],
            logicalOperators: [],
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
writeScripts(officialRequest, mocks.createResponse(), 'BM', 19);
