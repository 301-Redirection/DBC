import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { TeamDesiresService } from '../../services/team-desires.service';
import { ConfigurationFormat } from '../../ConfigurationFormat';

@Component({
    selector: 'app-team-desires',
    templateUrl: './team-desires.component.html',
    styleUrls: ['./team-desires.component.scss'],
})
export class TeamDesiresComponent implements OnInit {

    teamDesires: ConfigurationFormat;

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
        const lowerLane = lane.toLowerCase();
        return this.teamDesires[prop][lowerLane].compoundConditions.length - index - 1;
    }

    private addCondition(prop: string, condGroup: number, lane?: string): void {
        const index = this.getCondGroupIndex(condGroup, prop, lane);
        if (lane === undefined) {
            this.teamDesires[prop].compoundConditions[index].
            conditions.push(this.tdService.newCondition());
        } else {
            const lowerLane = lane.toLowerCase();
            this.teamDesires[prop][lowerLane].compoundConditions[index].
            conditions.push(this.tdService.newCondition());
        }
    }

    private delCondition(prop: string, condGroup: number, index: number, lane?: string) {
        const ans = window.confirm('Are you sure you wish to delete this Condition?');
        if (ans) {
            const condIndex = this.getCondGroupIndex(condGroup, prop, lane);
            if (lane === undefined) {
                this.teamDesires[prop].compoundConditions[condIndex].conditions.splice(index, 1);
            } else {
                const lowerLane = lane.toLowerCase();
                this.teamDesires[prop][lowerLane].compoundConditions[condIndex].
                conditions.splice(index, 1);
            }
        }
    }

    private addConditionGroup(prop: string, lane?: string): void {
        if (lane === undefined) {
            this.teamDesires[prop].compoundConditions.push(this.tdService.newCondGroup());
        } else {
            const lowerLane = lane.toLowerCase();
            this.teamDesires[prop][lowerLane].
            compoundConditions.push(this.tdService.newCondGroup());
        }
    }

    private delCondGroup(prop: string, lane?: string) {
        const ans = window.confirm('Are you sure you wish to delete this Condition Group?');
        window.alert('OK');
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