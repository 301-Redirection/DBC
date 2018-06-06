/*
 * Definition of the Configuration format for the parsing and transpiling
 * to and from lua scripts to JSON.This file will change as the complexity
 * of the configuration options specified grows.
 */

export class ConfigurationFormat {
    push: {
        top: Configuration;
        mid: Configuration;
        bot: Configuration;
    };
    farm: {
        top: Configuration;
        mid: Configuration;
        bot: Configuration;
    };
    defend: {
        top: Configuration;
        mid: Configuration;
        bot: Configuration;
    };
    roam: Configuration;
    roshan: Configuration;

    constructor() {
        for (const lane in this.push) {
            this.push[lane] = {
                compoundConditions: [
                    {
                        conditions: [
                            {
                                trigger: 1,
                                operator: 3,
                                conditional: 0.0,
                                action: 2,
                                value: 0.25,
                            },
                        ],
                        logicalOperator: [],
                    },
                ],
                initialValue: 0,
            };
        }

        for (const lane in this.farm) {
            this.farm[lane] = {
                compoundConditions: [
                    {
                        conditions: [
                            {
                                trigger: 1,
                                operator: 3,
                                conditional: 0.0,
                                action: 2,
                                value: 0.25,
                            },
                        ],
                        logicalOperator: [],
                    },
                ],
                initialValue: 0,
            };
        }

        for (const lane in this.defend) {
            this.defend[lane] = {
                compoundConditions: [
                    {
                        conditions: [
                            {
                                trigger: 1,
                                operator: 3,
                                conditional: 0.0,
                                action: 2,
                                value: 0.25,
                            },
                        ],
                        logicalOperator: [],
                    },
                ],
                initialValue: 0,
            };
        }

        this.roshan = {
            compoundConditions: [
                {
                    conditions: [
                        {
                            trigger: 1,
                            operator: 3,
                            conditional: 0.0,
                            action: 2,
                            value: 0.25,
                        },
                    ],
                    logicalOperator: [],
                },
            ],
            initialValue: 0,
        };

        this.roam = {
            compoundConditions: [
                {
                    conditions: [
                        {
                            trigger: 1,
                            operator: 3,
                            conditional: 0.0,
                            action: 2,
                            value: 0.25,
                        },
                    ],
                    logicalOperator: [],
                },
            ],
            initialValue: 0,
        };
    }
}

export interface Configuration {
    compoundConditions: CoumpoundCondition[];
    initialValue: any;
}

/*
 * A CompoundCondition will look as follows:
 * if (${conditions[0]} ${logicalOperator[0]} ${conditions[1]}
 *      ... ${logicalOperator[n-1]} ${conditions[n]}) {
 *      ${conditions[0].action} MEAN(${conditions[0].value}, ..., ${conditions[n].value})
 * }
 */
export interface CoumpoundCondition {
    conditions: Condition[];
    logicalOperator: LogicalOperator[];
}

/*
 * A Condition will look as follows:
 * if (${trigger} ${operator} ${conditional}) {
 *    ${action} ${value}
 * }
 */
export interface Condition {
    trigger: Trigger;
    operator: Operator;
    conditional: any;
    action: Action; // TODO: Come up with action types
    value: any;
}

export enum Action {
    Modify = 1,
    Return,
}

export enum Trigger {
    Time = 1,
    EnemyHeroesAlive,
    AlliedHeroesAlive,
    NumEnemyHeroesVisible,
    RadiusAlliedHeroes,
}

export enum LogicalOperator {
    AND = 1,
    OR,
}

export enum Operator {
    LessThan = 1,
    LessThanEqualTo,
    EqualTo,
    GreaterThanEqualTo,
    GreaterThan,
    NotEqual,
}
