/*
 * Definition of the Configuration format for the parsing and transpiling
 * to and from lua scripts to JSON.This file will change as the complexity
 * of the configuration options specified grows.
 */

export class ConfigurationFormat {
    heroPool: HeroPoolConfiguration;
    heroes: HeroSpecification[];
    desires: {
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
    };
    constructor() {
        this.heroPool = {
            partitioned: false,
            pool: [],
        },
        this.heroes = [];
        this.desires = {
            push: {
                top: new Configuration(),
                mid: new Configuration(),
                bot: new Configuration(),
            },
            farm: {
                top: new Configuration(),
                mid: new Configuration(),
                bot: new Configuration(),
            },
            defend: {
                top: new Configuration(),
                mid: new Configuration(),
                bot: new Configuration(),
            },
            roshan: new Configuration(),
            roam: new Configuration(),
        };
    }
}
export class Configuration {
    compoundConditions: CompoundCondition[];
    initialValue: any;

    constructor() {
        this.compoundConditions = [new CompoundCondition()];
        this.initialValue = 0;
    }
}

export class HeroSpecification {
    name: string;
    abilities: AbilityConfiguration;
    items: string[];

    constructor() {
        this.name = '';
        this.abilities = {
            abilities: '',
            talents: [],
        };
        this.items = [];
    }
}

export interface AbilityConfiguration {
    abilities: string;
    // specifically an array of 4
    talents: string[];
}

export interface HeroPoolConfiguration{
    partitioned: boolean;
    pool: HeroConfiguration[];
}

export interface HeroConfiguration {
    name: string;
    position: number;
}

/*
 * A CompoundCondition will look as follows:
 * if (${conditions[0]} ${logicalOperator[0]} ${conditions[1]}
 *      ... ${logicalOperator[n-1]} ${conditions[n]}) {
 *      ${conditions[0].action} MEAN(${conditions[0].value}, ..., ${conditions[n].value})
 * }
 */
export class CompoundCondition {
    conditions: Condition[];
    logicalOperators: LogicalOperator[];
    action: Action; // TODO: Come up with action types
    value: any;

    constructor() {
        this.conditions = [];
        this.logicalOperators = [];
        this.action = null;
        this.value = null;
    }
}

/*
 * A Condition will look as follows:
 * if (${trigger} ${operator} ${conditional}) {
 *    ${action} ${value}
 * }
 */
export class Condition {
    trigger: Trigger;
    operator: Operator;
    conditional: any;

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
