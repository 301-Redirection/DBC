import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
    ConfigurationFormat,
    Action,
    CompoundCondition,
    Configuration,
} from '../../services/ConfigurationFormat';
import { BotConfigDataService } from '../../services/bot-config-data.service';

// Import JQuery
declare var $: any;

@Component({
    selector: 'app-team-desires',
    templateUrl: './team-desires.component.html',
    styleUrls: ['./team-desires.component.scss'],
})
export class TeamDesiresComponent implements OnInit {

    config: ConfigurationFormat;

    actions = Action;

    lanes = [
        {
            title: 'Top',
            prop: 'top',
        },
        {
            title: 'Mid',
            prop: 'mid',
        },
        {
            title: 'Bot',
            prop: 'bot',
        },
    ];

    sectionsLanes = [
        {
            title: 'Push',
            prop: 'push',
        },
        {
            title: 'Defend',
            prop: 'defend',
        },
        {
            title: 'Farm',
            prop: 'farm',
        },
    ];

    sectionsNoLanes = [
        {
            title: 'Roshan',
            prop: 'roshan',
        },
        {
            title: 'Roam',
            prop: 'roam',
        },
    ];

    constructor(
        private botConfigData: BotConfigDataService,
    ) {}

    log(data) {
        console.log(data);
    }

    ngOnInit() {
        this.config = this.botConfigData.getDefaultConfiguration();
        this.saveTeamDesires();
        this.togglePanel();
    }

    saveTeamDesires(): void {
        this.botConfigData.setTeamDesires(this.config.desires);
    }

    // This is only used by a parent component if this component needs to be reset
    reset(): void {
        this.config = this.botConfigData.getDefaultConfiguration();
    }

    addCondition(compoundCondition: CompoundCondition): void {
        const newCond = this.botConfigData.newCondition();
        const len = compoundCondition.conditions.length;
        compoundCondition.conditions.push(newCond);
        if (len > 0) {
            compoundCondition.logicalOperators[len - 1] = 1;
        }
        this.saveTeamDesires();
    }

    delCondition(compoundCondition: CompoundCondition, index: number = -1) {
        const ans = window.confirm('Are you sure you wish to delete this Condition?');
        if (ans) {
            const len = compoundCondition.logicalOperators.length;
            compoundCondition.conditions.splice(index, 1);

            if (index === len - 1) {
                compoundCondition.logicalOperators.splice(index, 1);
            } else {
                compoundCondition.logicalOperators.splice(index - 1, 1);
            }
            this.saveTeamDesires();
        }
    }

    addConditionGroup(configuration: Configuration): void {
        configuration.compoundConditions.push(this.botConfigData.newCondGroup());
        this.saveTeamDesires();
    }

    delCondGroup(compound: CompoundCondition[], index: number = -1) {
        this.log(compound);
        this.log(index);
        const ans = window.confirm('Are you sure you wish to delete this Condition Group?');
        if (ans) {
            const len = compound.length - 1;
            compound.splice(len - index, 1);
            this.saveTeamDesires();
        }
    }

    getOperator(compoundCondition: CompoundCondition, index: number = 0): string {
        return compoundCondition.logicalOperators[index] === 1 ? 'AND' : 'OR';
    }

    addOperator(compoundCondition: CompoundCondition, index: number, op: number) {
        const len = compoundCondition.logicalOperators.length;
        if (len === index) {
            this.addCondition(compoundCondition);
        }
        compoundCondition.logicalOperators[index] = op;
    }

    sanitizeReturnValue(data: CompoundCondition) {
        if (data.value < -100) {
            data.value = -100;
        }
        if (data.value > 100) {
            data.value = 100;
        }
    }
}

@Pipe({
    name: 'reverse',
    pure: false,
})
export class ReversePipe implements PipeTransform {
    transform(values) {
        if (values) {
            return values.reverse();
        }
    }
}
