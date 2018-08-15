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
