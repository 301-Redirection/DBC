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
