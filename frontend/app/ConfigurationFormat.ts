/*
 * Definition of the Configuration format for the parsing and transpiling
 * to and from lua scripts to JSON. This file will change as the complexity
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
        this.push = {
            top: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
            mid: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
            bot: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
        };
        this.farm = {
            top: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
            mid: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
            bot: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
        };
        this.defend= {
            top: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
            mid: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
            bot: {
                compoundConditions: [
                    {
                        conditions: [],
                        logicalOperators: [],
                    },
                ],
                initialValue: 0,
            },
        };

        this.roshan = {
            compoundConditions: [
                {
                    conditions: [],
                    logicalOperators: [],
                },
            ],
            initialValue: 0,
        };

        this.roam = {
            compoundConditions: [
                {
                    conditions: [],
                    logicalOperators: [],
                },
            ],
            initialValue: 0,
        };
    }
}

export interface Configuration {
    compoundConditions: CompoundCondition[];
    initialValue: any;
}

/*
 * A CompoundCondition will look as follows:
 * if (${conditions[0]} ${logicalOperators[0]} ${conditions[1]}
 *      ... ${logicalOperators[n-1]} ${conditions[n]}) {
 *      ${conditions[0].action} MEAN(${conditions[0].value}, ..., ${conditions[n].value})
 * }
 */
export interface CompoundCondition {
    conditions: Condition[];
    logicalOperators: logicalOperators[];
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
