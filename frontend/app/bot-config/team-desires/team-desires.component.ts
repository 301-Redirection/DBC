import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { TeamDesiresService } from '../../services/team-desires.service';
import { ConfigurationFormat } from '../../ConfigurationFormat';

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
    - Fix first element delete with logical operator not deleting
    - Add create condition on last element logical operator selection
    */

    teamDesires: ConfigurationFormat;

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

    constructor(private tdService: TeamDesiresService) {}

    ngOnInit() {
        this.teamDesires = this.tdService.getDefaultConfiguration();
    }

    private trackByFn(index, item) {
        return index;
    }

    private getCondGroupIndex(index: number, prop: string, lane: string): number {
        if (lane === undefined) {
            return this.teamDesires[prop].compoundConditions.length - index - 1;
        }
        return this.teamDesires[prop][lane].compoundConditions.length - index - 1;
    }

    private addCondition(prop: string, condGroup: number, lane?: string): void {
        const groupIndex = this.getCondGroupIndex(condGroup, prop, lane);
        const newCond = this.tdService.newCondition();
        if (lane === undefined) {
            const len = this.teamDesires[prop].compoundConditions[groupIndex].conditions.length;
            this.teamDesires[prop].compoundConditions[groupIndex].
            conditions.push(newCond);
            if (len > 0) {
                this.teamDesires[prop].compoundConditions[groupIndex].
                logicalOperators[len - 1] = 1;
            }
        } else {
            const len = this.teamDesires[prop][lane].compoundConditions[groupIndex].
            conditions.length;
            this.teamDesires[prop][lane].compoundConditions[groupIndex].
            conditions.push(newCond);
            if (len > 0) {
                this.teamDesires[prop][lane].compoundConditions[groupIndex].
                logicalOperators[len - 1] = 1;
            }
        }
    }

    private delCondition(prop: string, condGroup: number, index: number = -1, lane?: string) {
        const ans = window.confirm('Are you sure you wish to delete this Condition?');
        if (ans) {
            const groupIndex = this.getCondGroupIndex(condGroup, prop, lane);
            if (lane === undefined) {
                this.teamDesires[prop].compoundConditions[groupIndex].conditions.splice(index, 1);
                const len = this.teamDesires[prop].compoundConditions[groupIndex].logicalOperators.
                length;
                if (index === len) {
                    this.teamDesires[prop].compoundConditions[groupIndex].logicalOperators.
                    splice(index, 1);
                } else {
                    this.teamDesires[prop].compoundConditions[groupIndex].logicalOperators.
                    splice(index - 2, 1);
                }
            } else {
                this.teamDesires[prop][lane].compoundConditions[groupIndex].
                conditions.splice(index, 1);
                const len = this.teamDesires[prop][lane].compoundConditions[groupIndex].
                logicalOperators.length;
                if (index === len) {
                    this.teamDesires[prop][lane].compoundConditions[groupIndex].logicalOperators.
                    splice(index, 1);
                } else {
                    this.teamDesires[prop][lane].compoundConditions[groupIndex].logicalOperators.
                    splice(index - 1, 1);
                }
            }
        }
    }

    private addConditionGroup(prop: string, lane?: string): void {
        if (lane === undefined) {
            this.teamDesires[prop].compoundConditions.push(this.tdService.newCondGroup());
        } else {
            this.teamDesires[prop][lane].
            compoundConditions.push(this.tdService.newCondGroup());
        }
    }

    private delCondGroup(prop: string, lane?: string) {
        const ans = window.confirm('Are you sure you wish to delete this Condition Group?');
        window.alert('OK');
    }

    private setOperator(prop: string, condGroup: number, lane?: string, index: number = 0,
                        val: number = 1) {
        const groupIndex = this.getCondGroupIndex(condGroup, prop, lane);
        if (lane === undefined) {
            this.teamDesires[prop].compoundConditions[groupIndex].logicalOperators[index] = val;
        } else {
            this.teamDesires[prop][lane].compoundConditions[groupIndex].
            logicalOperators[index] = val;
        }
    }

    private getOperator(prop: string, condGroup: number, index: number = 0, lane?: string): string {
        const groupIndex = this.getCondGroupIndex(condGroup, prop, lane);
        let op = -1;
        if (lane === undefined) {
            op = this.teamDesires[prop].compoundConditions[groupIndex].
            logicalOperators[index];
        } else {
            op = this.teamDesires[prop][lane].compoundConditions[groupIndex].
            logicalOperators[index];
        }
        return op === 1 ? 'AND' : 'OR';
    }

    private log(val: any) {
        console.log(val);
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
