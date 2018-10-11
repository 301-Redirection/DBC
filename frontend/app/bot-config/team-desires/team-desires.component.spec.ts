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
    const nullCondition: Condition = new Condition();
    const nullCompoundCondition: CompoundCondition = new CompoundCondition();

    // Condition comparison by property
    const compareCondition = (data: Condition) => {
        for (const key in data) {
            if (data[key] !== nullCondition[key]) {
                return false;
            }
            return true;
        }
    };

    // Compound Condition by property
    const compareCompoundCondition = (data: CompoundCondition) => {
        if (data.value !== nullCompoundCondition.value ||
            data.action !== nullCompoundCondition.action ||
            (data.logicalOperators.length !== nullCompoundCondition.logicalOperators.length &&
                data.logicalOperators.length === 0) ||
            (data.conditions.length !== nullCompoundCondition.conditions.length &&
                data.conditions.length === 0)) {
            return false;
        }
        return true;
    };

    // Custom equality matchers for jasmine to use in tests
    const customMatchers = {
        toBeNullCondition: () => {
            return {
                compare: (actual: Condition) => {
                    const result = {
                        pass: compareCondition(actual),
                    };
                    return result;
                },
            };
        },
        toBeNullCompoundCondition: () => {
            return {
                compare: (actual: CompoundCondition) => {
                    console.log(actual);
                    const result = {
                        pass: compareCompoundCondition(actual),
                    };
                    return result;
                },
            };
        },
    };

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
        jasmine.addMatchers(customMatchers);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add new condition to array', () => {
        component.addCondition(component.config.desires.push.top.compoundConditions[0]);

        expect(component.config.desires.push.top.compoundConditions[0].conditions[0])
        // @ts-ignore
            .toBeNullCondition();
    });

    it('should add new compound condition object to array', () => {
        component.addConditionGroup(component.config.desires.push.top);
        // @ts-ignore
        expect(component.config.desires.push.top.compoundConditions[1]).toBeNullCompoundCondition();
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
