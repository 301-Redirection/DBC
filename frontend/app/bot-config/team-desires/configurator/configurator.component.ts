import {
    Component,
    Input,
    Output,
    Pipe,
    PipeTransform,
    EventEmitter,
} from '@angular/core';
import {
    Condition,
    Operator,
    Trigger,
} from '../../../services/ConfigurationFormat';

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

    min = 0;
    max = 5;

    constructor() {}

    ngOnInit() {}

    changeCondition() {
        this.conditionChange.emit(this.condition);
    }

    updateInputBounds(data: string) {
        if (data === 'Game Time') {
            this.min = 0;
            this.max = 5 * 60;
        } else {
            this.min = 0;
            this.max = 5;
        }
    }

    sanitizeInput() {
        if (this.condition.conditional < this.min) {
            this.condition.conditional = this.min;
        }
        if (this.condition.conditional > this.max) {
            this.condition.conditional = this.max;
        }
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
