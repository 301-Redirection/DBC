const { templateGenerator } = require('./TemplateBasedGenerator.js');

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
    ]
};
const configObject = {
    heroes: heroes2,
    drow_ranger: {
        abilities: input,
        items,
    },
};

templateGenerator.generateBotScripts(configObject);