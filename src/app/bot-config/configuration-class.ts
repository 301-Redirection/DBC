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

        // this.conditions.push({
        //     trigger: null,
        //     operator: Operator.LessThan,
        //     conditional: 0,
        //     action: Action.Modify,
        //     value: 0,
        // });
        
        const compound = {
            conditions: this.conditions,
            logicalOperator: this.logicalOperator,
        };        
        
        this.compoundConditions.push(compound);
        this.initialValue = 0;
    }
}
