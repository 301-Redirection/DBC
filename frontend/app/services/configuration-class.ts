import {
    CompoundCondition,
    Condition,
    Trigger,
    Operator,
    Action,
    LogicalOperator,
    AbilityConfiguration,
} from './ConfigurationFormat';

export class ConfigurationClass {
    conditions: Condition[];
    logicalOperator: LogicalOperator[];
    compoundConditions: CompoundCondition[];
    initialValue: any;

    constructor() {
        this.conditions = [];
        this.logicalOperator = [];
        this.compoundConditions = [];
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
