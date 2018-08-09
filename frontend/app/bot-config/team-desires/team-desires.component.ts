import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
// import { TeamDesiresService } from '../../services/team-desires.service';
import {
    ConfigurationFormat,
    Action,
    CompoundCondition,
    Configuration,
} from '../../services/ConfigurationFormat';
import { BotConfigDataService } from '../../services/bot-config-data.service';

@Component({
    selector: 'app-team-desires',
    templateUrl: './team-desires.component.html',
    styleUrls: ['./team-desires.component.scss'],
})
export class TeamDesiresComponent implements OnInit {

    /*
    TODO:
    - Add a Function to change enums' keys into something easier to understand
    - Add a Delete condition group button
    */

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
        // private tdService: TeamDesiresService,
        private botConfigData: BotConfigDataService,
    ) {}

    ngOnInit() {
        this.config = this.botConfigData.getDefaultConfiguration();
        this.saveTeamDesires();
    }

    private trackByFn(index, item) {
        return index;
    }

    private saveTeamDesires(): void {
        this.botConfigData.setTeamDesires(this.config.desires);
    }

    private getCondGroupIndex(index: number, prop: string, lane: string): number {
        if (lane === undefined) {
            return this.config.desires[prop].compoundConditions.length - index - 1;
        }
        return this.config.desires[prop][lane].compoundConditions.length - index - 1;
    }

    private addCondition(compoundCondition: CompoundCondition): void {
        const newCond = this.botConfigData.newCondition();
        const len = compoundCondition.conditions.length;
        compoundCondition.conditions.push(newCond);
        if (len > 0) {
            compoundCondition.logicalOperators[len - 1] = 1;
        }
        this.saveTeamDesires();
    }

    private delCondition(compoundCondition: CompoundCondition, index: number = -1) {
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

    private addConditionGroup(configuration: Configuration): void {
        configuration.compoundConditions.push(this.botConfigData.newCondGroup());
        this.saveTeamDesires();
    }

    private delCondGroup(configuration: Configuration, index: number = -1) {
        const ans = window.confirm('Are you sure you wish to delete this Condition Group?');
        if (ans) {
            configuration.compoundConditions.splice(index, 1);
            this.saveTeamDesires();
        }
    }

    private getOperator(compoundCondition: CompoundCondition, index: number = 0): string {
        return compoundCondition.logicalOperators[index] === 1 ? 'AND' : 'OR';
    }

    private addOperator(compoundCondition: CompoundCondition, index: number, op: number) {
        const len = compoundCondition.logicalOperators.length;
        if (len === index) {
            compoundCondition.logicalOperators.push(op);
            this.addCondition(compoundCondition);
        } else {
            compoundCondition.logicalOperators[index] = op;
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
