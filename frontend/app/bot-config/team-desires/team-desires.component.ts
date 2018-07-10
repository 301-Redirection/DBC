import { Component, OnInit } from "@angular/core";
import { ConfiguratorComponent } from "./configurator/configurator.component";
import {
    ConfigurationFormat,
    Condition,
} from "../../ConfigurationFormat";
import { LowerCasePipe } from "@angular/common";

@Component({
    selector: "app-team-desires",
    templateUrl: "./team-desires.component.html",
    styleUrls: ["./team-desires.component.scss"]
})
export class TeamDesiresComponent implements OnInit {
    teamDesires: ConfigurationFormat = new ConfigurationFormat();;
    constructor() {}

    ngOnInit() {}

    private trackByFn(index, item) {
        return index;
    }

    private getConditions(prop: string, lane?: string): Condition[] {
        if (lane == undefined) {
            return this.teamDesires[prop].compoundConditions.conditions;
        } else {
            lane = lane.toLowerCase();
            console.log(this.teamDesires[prop][lane].compoundConditions[0].conditions);
            return this.teamDesires[prop][lane].compoundConditions[0].conditions;
        }
    }
}
