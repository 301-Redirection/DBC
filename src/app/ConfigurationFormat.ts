/*
 * Definition of the Configuration format for the parsing and transpiling to and from lua scripts to JSON.
 * This file will change as the complexity of the configuration options specified grows.
 */

export class ConfigurationFormat {
    name: string;
    description: string;
    
    push: {
        top: Condition[];
        mid: Condition[];
        bot: Condition[];
    };
    farm: {
        top: Condition[];
        mid: Condition[];
        bot: Condition[];
    };
    defend: {
        top: Condition[];
        mid: Condition[];
        bot: Condition[];
    };
    roam: Condition[];
    roshan: Condition[];
}

export class Condition {
    trigger: Trigger;
    operator: Operator;
    conditional: any;
    action: any; // TODO: Come up with action types
}

enum Trigger {
    Time = 1,
    EnemyHeroesAlive,
    AlliedHeroesAlive
}

enum Operator {
    LessThan = 1,
    LessThanEqualTo,
    EqualTo,
    GreaterThanEqualTo,
    GreaterThan,
    NotEqual
}