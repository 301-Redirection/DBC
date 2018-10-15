module.exports = {
    body: {
        configuration: {
            heroPool: {
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
            },
            heroes: [
                {
                    name: 'drow_ranger',
                    items: [
                        {
                            name: 'item_dagon_recipe',
                            components: [
                                {
                                    name: 'item_dagon_recipe',
                                    components: [
                                        {
                                            name: 'item_dagon_recipe',
                                            components: [
                                                {
                                                    name: 'item_dagon_recipe',
                                                    components: [
                                                        {
                                                            name: 'item_dagon_recipe',
                                                            components: [
                                                                {
                                                                    name: 'item_null_talisman',
                                                                    components: [
                                                                        {
                                                                            name: 'item_mantle',
                                                                            components: [],
                                                                        },
                                                                        {
                                                                            name: 'item_circlet',
                                                                            components: [],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    name: 'item_staff_of_wizardry',
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
                            name: 'item_lame',
                            components: [],
                        },
                        {
                            name: 'item_dagon_recipe',
                            components: [
                                {
                                    name: 'item_dagon_recipe',
                                    components: [
                                        {
                                            name: 'item_recipe_null_talisman',
                                            components: [
                                                {
                                                    name: 'item_mantle',
                                                    components: [],
                                                },
                                                {
                                                    name: 'item_circlet',
                                                    components: [],
                                                },
                                            ],
                                        },
                                        {
                                            name: 'item_staff_of_wizardry',
                                            components: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'bane',
                },
                {
                    name: 'alchemist',
                },
                {
                    name: 'abaddon',
                },
                {
                    name: 'antimage',
                },
                {
                    name: 'axe',
                },
                {
                    name: 'bloodseeker',
                },
                {
                    name: 'centaur',
                },
                {
                    name: 'chen',
                },
                {
                    name: 'chaos_knight',
                },
                {
                    name: 'crystal_maiden',
                },
            ],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                    },
                                ],
                                action: 1,
                                value: 0.25,
                                logicalOperators: [],
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
                                },
                            ],
                            action: 1,
                            value: 0.25,
                            logicalOperators: [],
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
                                },
                            ],
                            action: 1,
                            value: 0.25,
                            logicalOperators: [],
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
