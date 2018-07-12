import {
    CompoundCondition,
    Condition,
    Trigger,
    Operator,
    Action,
    LogicalOperator,
} from '../ConfigurationFormat';

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
