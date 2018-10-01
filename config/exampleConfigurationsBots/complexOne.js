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
                                        action: 1,
                                        value: 0.1,
                                    },
                                ],
                                logicalOperator: [],
                            },
                            {
                                conditions: [
                                    {
                                        trigger: 2,
                                        operator: 2,
                                        conditional: 3,
                                        action: 1,
                                        value: 0.35,
                                    },
                                    {
                                        trigger: 3,
                                        operator: 4,
                                        conditional: 4,
                                        action: 1,
                                        value: 0.35,
                                    },
                                    {
                                        trigger: 1,
                                        operator: 2,
                                        conditional: 1200,
                                        action: 1,
                                        value: 0.25,
                                    },
                                ],
                                logicalOperator: [1, 1],
                            },
                        ],
                        initialValue: 0.2,
                    },
                    mid: {
                        compoundConditions: [
                            {
                                conditions: [
                                    {
                                        trigger: 1,
                                        operator: 1,
                                        conditional: 10,
                                        action: 2,
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
                                        operator: 2,
                                        conditional: 15,
                                        action: 2,
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
                                        operator: 2,
                                        conditional: 20,
                                        action: 1,
                                        value: 0.5,
                                    },
                                ],
                                logicalOperator: [],
                            },
                            {
                                conditions: [
                                    {
                                        trigger: 2,
                                        operator: 4,
                                        conditional: 3,
                                        action: 1,
                                        value: -0.2,
                                    },
                                    {
                                        trigger: 1,
                                        operator: 4,
                                        conditional: 3,
                                        action: 1,
                                        value: -0.25,
                                    },
                                ],
                                logicalOperator: [2],
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
                                        operator: 2,
                                        conditional: 20,
                                        action: 1,
                                        value: 0.5,
                                    },
                                ],
                                logicalOperator: [],
                            },
                            {
                                conditions: [
                                    {
                                        trigger: 2,
                                        operator: 4,
                                        conditional: 3,
                                        action: 1,
                                        value: -0.15,
                                    },
                                    {
                                        trigger: 1,
                                        operator: 4,
                                        conditional: 3,
                                        action: 1,
                                        value: -0.15,
                                    },
                                ],
                                logicalOperator: [1],
                            },
                        ],
                        initialValue: 0.35,
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
                                    operator: 4,
                                    conditional: 35,
                                    action: 1,
                                    value: 0.35,
                                },
                                {
                                    trigger: 2,
                                    operator: 2,
                                    conditional: 3,
                                    action: 1,
                                    value: 0.35,
                                },
                            ],
                            logicalOperator: [2],
                        },
                    ],
                    initialValue: 0.25,
                },
                roam: {
                    compoundConditions: [
                        {
                            conditions: [
                                {
                                    trigger: 3,
                                    operator: 2,
                                    conditional: 2,
                                    action: 1,
                                    value: -0.25,
                                },
                            ],
                            logicalOperator: [],
                        },
                        {
                            conditions: [
                                {
                                    trigger: 1,
                                    operator: 2,
                                    conditional: 15,
                                    action: 1,
                                    value: 0.4,
                                },
                                {
                                    trigger: 3,
                                    operator: 4,
                                    conditional: 1,
                                    action: 1,
                                    value: 0.25,
                                },
                            ],
                            logicalOperator: [2],
                        },
                    ],
                    initialValue: 0.25,
                },
            },
        },
        name: 'test',
        description: 'complex object test',
    },
};
