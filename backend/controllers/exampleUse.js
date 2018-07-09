const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();
// const { codeGenerator } = require('./LuaCodeTemplateManager.js');
const { writeScripts } = require('./generateScript.js');
const mocks = require('node-mocks-http');

const items = ['item_slippers',
    'item_circlet',
    'item_recipe_wraith_band',
    'item_tango'];

const input = {
    abilities: 'qweqqrewqetnqrnt', talents: ['l', 'r', 'l', 'l'],
};
const heroes1 = {
    partitioned: 'false',
    pool: [
            'drow_ranger',
            'bane',
            'alchemist',
            'abaddon',
            'antimage',
            'axe',
            'bloodseeker',
            'centaur',
            'chen',
            'chaos_knight',
            'crystal_maiden',
        ],
};
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
    heroPool: heroes1,
    // heroPool: {},
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

writeScripts(officialRequest, mocks.createResponse(), '_____', 2);

const defaultThing = {
    body: {
        heroPool: { partitioned: 'false'},
        configuration: {
            desires: {
                push: {
                    top: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                    mid: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                    bot: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                },
                farm: {
                    top: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                    mid: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                    bot: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                },
                defend: {
                    top: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                    mid: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                    bot: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 5,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [],
                            },
                        ],
                        initialValue: 0.25,
                    },
                },
                roshan: {
                    compoundConditions: [
                        {
                            conditions: [
                                {
                                    trigger: 1,
                                    operator: 1,
                                    conditional: 5,
                                    action: 1,
                                    value: 0.25,
                                },
                            ],
                            logicalOperator: [],
                        },
                    ],
                    initialValue: 0.25,
                },
                roam: {
                    compoundConditions: [
                        {
                            conditions: [
                                {
                                    trigger: 1,
                                    operator: 1,
                                    conditional: 5,
                                    action: 1,
                                    value: 0.25,
                                },
                            ],
                            logicalOperator: [],
                        },
                    ],
                    initialValue: 0.25,
                },
            },
        },
        name: 'test',
        description: 'default object test',
    },
};
writeScripts(defaultThing, mocks.createResponse(), '_____', 2);