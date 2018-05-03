/*
 * Definition of the Configuration format for the parsing and transpiling to and from lua scripts to JSON.
 * This file will change as the complexity of the configuration options specified grows.
 */

export interface ConfigurationFormat {
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
}

export interface Configuration {
    conditions: CoumpoundCondition[];
    initalValue: any;
}

/*
 * A CompoundCondition will look as follows:
 * if (${conditions[0]} ${logicalOperator[0]} ${conditions[1]} ... ${logicalOperator[n-1]} ${conditions[n]}) {
 *      ${conditions[0].action} MEAN(${conditions[0].value}, ..., ${conditions[0].value})
 * }
 */
export interface CoumpoundCondition {
    compoundConditions: Condition[];
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
    action: any; // TODO: Come up with action types
    value: any;
}

export enum Action {
    Modify = 1,
    Return
}

export enum Trigger {
    Time = 1,
    EnemyHeroesAlive,
    AlliedHeroesAlive,
    NumEnemyHeroesVisible,
    RadiusAlliedHeroes
}

export enum LogicalOperator {
    AND = 1,
    OR
}

export enum Operator {
    LessThan = 1,
    LessThanEqualTo,
    EqualTo,
    GreaterThanEqualTo,
    GreaterThan,
    NotEqual
}
