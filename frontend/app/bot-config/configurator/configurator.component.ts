import {
    Component,
    Input,
    Output,
    EventEmitter,
    Pipe,
    PipeTransform,
    SimpleChanges,
    OnInit,
} from '@angular/core';
import {
    Action,
    Condition,
    Operator,
    Trigger,
} from '../../ConfigurationFormat';

@Component({
    selector: 'configurator',
    templateUrl: './configurator.component.html',
    styleUrls: ['./configurator.component.scss'],
})

export class ConfiguratorComponent {
    @Input() condition: Condition;
    @Output() conditionChange = new EventEmitter<Condition>();
    triggers = Trigger;
    actions = Action;
    operators = Operator;

    constructor() {}

    ngOnInit() {
        if (typeof this.condition === 'undefined') {
            this.condition = {
                trigger: 0,
                operator: 0,
                conditional: 0,
                action: 0,
                value: 0.25,
            };
        }
    }

    changeCondition() {
        this.conditionChange.emit(this.condition);
    }
}

@Pipe({
    name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
        const keys = Object.keys(data);
        return keys.slice(keys.length / 2);
    }
}
