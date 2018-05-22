import {
    CoumpoundCondition,
    Condition,
    Trigger,
    Operator,
    Action,
    LogicalOperator,
} from '../ConfigurationFormat';

export class ConfigurationClass {
    conditions: Condition[];
    logicalOperator: LogicalOperator[];
    compoundConditions: CoumpoundCondition[];
    initialValue: any;

    constructor() {
        this.conditions = [];
        this.logicalOperator = [];
        this.compoundConditions = [];
        this.initialValue = 0;
    }
}
