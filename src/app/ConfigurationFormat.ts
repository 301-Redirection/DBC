/*
 * Definition of the Configuration format for the parsing and transpiling to and from lua scripts to JSON.
 * This file will change as the complexity of the configuration options specified grows.
 */

export interface ConfigurationFormat {
    name: string;
    description: string;
    
    push: {
        top: {
            conditions: CoumpoundCondition[]
            default: any
        }
        mid: CoumpoundCondition[];
        bot: CoumpoundCondition[];
    };
    farm: {
        top: CoumpoundCondition[];
        mid: CoumpoundCondition[];
        bot: CoumpoundCondition[];
    };
    defend: {
        top: CoumpoundCondition[];
        mid: CoumpoundCondition[];
        bot: CoumpoundCondition[];
    };
    roam: CoumpoundCondition[];
    roshan: CoumpoundCondition[];
}

export interface CoumpoundCondition {
    conditions: Condition[];
    logicalOperator: LogicalOperator[];
}

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
    AlliedHeroesAlive
}

export enum LogicalOperator {
    AND = 1,
    OR,
    NAND,
    NOR
}

export enum Operator {
    LessThan = 1,
    LessThanEqualTo,
    EqualTo,
    GreaterThanEqualTo,
    GreaterThan,
    NotEqual
}