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
            top: new Configuration(),
            mid: new Configuration(),
            bot: new Configuration(),
        };
        this.farm = {
            top: new Configuration(),
            mid: new Configuration(),
            bot: new Configuration(),
        };
        this.defend = {
            top: new Configuration(),
            mid: new Configuration(),
            bot: new Configuration(),
        };

        this.roshan = new Configuration();

        this.roam = new Configuration();
    }
}

export class Configuration {
    compoundConditions: CompoundCondition[];
    initialValue: any;

    constructor() {
        this.compoundConditions = [];
        this.compoundConditions.push(new CompoundCondition());
        this.initialValue = 0;
    }
}

export class CompoundCondition {
    conditions: Condition[];
    logicalOperators: LogicalOperator[];
    action: Action;
    value: number;

    constructor() {
        this.conditions = [];
        this.logicalOperators = [];
        this.action = null;
        this.value = null;
    }
}

export class Condition {
    trigger: Trigger;
    operator: Operator;
    conditional: number;

    constructor() {
        this.trigger = null;
        this.operator = null;
        this.conditional = null;
    }
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
