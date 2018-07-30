import {
    Component,
    Input,
    Output,
    EventEmitter,
    Pipe,
    PipeTransform,
} from '@angular/core';
import {
    Condition,
    Operator,
    Trigger,
} from '../../../ConfigurationFormat';

@Component({
    selector: 'configurator',
    templateUrl: './configurator.component.html',
    styleUrls: ['./configurator.component.scss'],
})

export class ConfiguratorComponent {
    @Input() condition: Condition;
    @Output() conditionChange = new EventEmitter<Condition>();
    triggers = Trigger;
    operators = Operator;

    constructor() {}

    ngOnInit() {}

    changeCondition() {
        this.conditionChange.emit(this.condition);
    }
}

/*
 * This Pipe creates an iterable array to iterate over for the frontend with the keys
 *  An enumerated data type wasn't working with Angular's *ngFor
 */
@Pipe({
    name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
        const keys = Object.keys(data);
        return keys.slice(keys.length / 2);
    }
}
