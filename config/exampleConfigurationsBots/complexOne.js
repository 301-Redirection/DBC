module.exports = {
    body: {
        configuration: {
            heroPool: {
                partitioned: false,
                pool: [
                    {
                        name: 'drow_ranger',
                        position: -1,
                    },
                    {
                        name: 'bane',
                        position: -1,
                    },
                    {
                        name: 'alchemist',
                        position: -1,
                    },
                    {
                        name: 'abaddon',
                        position: -1,
                    },
                    {
                        name: 'antimage',
                        position: -1,
                    },
                    {
                        name: 'axe',
                        position: -1,
                    },
                    {
                        name: 'bloodseeker',
                        position: -1,
                    },
                    {
                        name: 'centaur',
                        position: -1,
                    },
                    {
                        name: 'chen',
                        position: -1,
                    },
                    {
                        name: 'chaos_knight',
                        position: -1,
                    },
                    {
                        name: 'crystal_maiden',
                        position: -1,
                    },
                ],
            },
            heroes: [],
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
                                value: 1,
                                logicalOperators: [],
                            },
                            {
                                conditions: [
                                    {
                                        trigger: 2,
                                        operator: 2,
                                        conditional: 3,
                                    },
                                    {
                                        trigger: 3,
                                        operator: 4,
                                        conditional: 4,
                                    },
                                    {
                                        trigger: 1,
                                        operator: 2,
                                        conditional: 1200,
                                    },
                                ],
                                action: 1,
                                value: 35,
                                logicalOperators: [1, 1],
                            },
                        ],
                        initialValue: 2,
                    },
                    mid: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 10,
                                    },
                                ],
                                action: 2,
                                value: 25,
                                logicalOperators: [],
                            },
                        ],
                        initialValue: 25,
                    },
                    bot: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 2,
                                        conditional: 15,
                                    },
                                ],
                                action: 2,
                                value: 25,
                                logicalOperators: [],
                            },
                        ],
                        initialValue: 25,
                    },
                },
                farm: {
                    top: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 2,
                                        conditional: 20,
                                    },
                                ],
                                action: 1,
                                value: 5,
                                logicalOperators: [],
                            },
                            {
                                conditions: [
                                    {
                                        trigger: 2,
                                        operator: 4,
                                        conditional: 3,
                                    },
                                    {
                                        trigger: 1,
                                        operator: 4,
                                        conditional: 3,
                                    },
                                ],
                                action: 1,
                                value: -22.5,
                                logicalOperators: [2],
                            },
                        ],
                        initialValue: 25,
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
                                value: 25,
                                logicalOperators: [],
                            },
                        ],
                        initialValue: 25,
                    },
                    bot: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 2,
                                        conditional: 20,
                                    },
                                ],
                                action: 1,
                                value: 5,
                                logicalOperators: [],
                            },
                            {
                                conditions: [
                                    {
                                        trigger: 2,
                                        operator: 4,
                                        conditional: 3,
                                    },
                                    {
                                        trigger: 1,
                                        operator: 4,
                                        conditional: 3,
                                    },
                                ],
                                action: 1,
                                value: -15,
                                logicalOperators: [1],
                            },
                        ],
                        initialValue: 35,
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
                                value: 25,
                                logicalOperators: [],
                            },
                        ],
                        initialValue: 25,
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
                                value: 25,
                                logicalOperators: [],
                            },
                        ],
                        initialValue: 25,
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
                                value: 25,
                                logicalOperators: [],
                            },
                        ],
                        initialValue: 25,
                    },
                },
                roshan: {
                    compoundConditions: [
                        {
                            conditions: [
                                {
                                    trigger: 1,
                                    operator: 4,
                                    conditional: 35,
                                },
                                {
                                    trigger: 2,
                                    operator: 2,
                                    conditional: 3,
                                },
                            ],
                            action: 1,
                            value: 35,
                            logicalOperators: [2],
                        },
                    ],
                    initialValue: 25,
                },
                roam: {
                    compoundConditions: [
                        {
                            conditions: [
                                {
                                    trigger: 3,
                                    operator: 2,
                                    conditional: 2,
                                },
                            ],
                            action: 1,
                            value: -25,
                            logicalOperators: [],
                        },
                        {
                            conditions: [
                                {
                                    trigger: 1,
                                    operator: 2,
                                    conditional: 15,
                                },
                                {
                                    trigger: 3,
                                    operator: 4,
                                    conditional: 1,
                                },
                            ],
                            action: 1,
                            value: 32.5,
                            logicalOperators: [2],
                        },
                    ],
                    initialValue: 25,
                },
            },
        },
        name: 'test',
        description: 'complex object test',
    },
};
