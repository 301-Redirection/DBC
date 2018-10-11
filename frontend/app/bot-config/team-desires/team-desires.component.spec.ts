import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { TeamDesiresComponent, ReversePipe } from './team-desires.component';
import { EnumToArrayPipe } from './configurator/configurator.component';
import { FormsModule } from '@angular/forms';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { MaterialModule } from '../../material/material.module';
import {
    Condition,
    ConfigurationFormat,
    CompoundCondition,
    Configuration,
} from '../../services/ConfigurationFormat';

@Component({ selector: 'configurator', template: '' })
class ConfiguratorStubComponent {
    @Input() condition;
}

describe('TeamDesiresComponent', () => {
    let component: TeamDesiresComponent;
    let fixture: ComponentFixture<TeamDesiresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeamDesiresComponent,
                ConfiguratorStubComponent,
                ReversePipe,
                EnumToArrayPipe,
            ],
            imports: [
                FormsModule,
                MaterialModule,
            ],
            providers: [
                BotConfigDataService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        const config: ConfigurationFormat = {
            heroes: null,
            heroPool: null,
            desires: {
                push: {
                    top: new Configuration(),
                    mid: new Configuration(),
                    bot: new Configuration(),
                },
                farm: {
                    top: new Configuration(),
                    mid: new Configuration(),
                    bot: new Configuration(),
                },
                defend: {
                    top: new Configuration(),
                    mid: new Configuration(),
                    bot: new Configuration(),
                },
                roam: new Configuration(),
                roshan: new Configuration(),
            },
        };

        fixture = TestBed.createComponent(TeamDesiresComponent);
        component = fixture.componentInstance;
        component.config = config;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add condition to array', () => {
        component.addCondition(component.config.desires.push.top.compoundConditions[0]);

        expect(component.config.desires.push.top.compoundConditions[0].conditions.length)
            .toEqual(1);
    });

    it('should add compound condition object to array', () => {
        component.addConditionGroup(component.config.desires.push.top);
        expect(component.config.desires.push.top.compoundConditions.length).toEqual(2);
    });

    it('should change the values of the new condition', () => {
        const condition: Condition = {
            conditional: 1,
            trigger: 1,
            operator: 2,
        };

        const compound: CompoundCondition = {
            conditions: [condition],
            logicalOperators: [],
            action: 2,
            value: 30,
        };

        component.config.desires.push.top.compoundConditions[0] = compound;

        expect(component.config.desires.push.top.compoundConditions[0].conditions[0]
            .conditional).toEqual(1);
        expect(component.config.desires.push.top.compoundConditions[0].conditions[0]
            .trigger).toEqual(1);
        expect(component.config.desires.push.top.compoundConditions[0].conditions[0]
            .operator).toEqual(2);
    });
});

// TODO Add more spec tests
