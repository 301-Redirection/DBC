import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { TeamDesiresComponent, ReversePipe } from './team-desires.component';
import { EnumToArrayPipe } from './configurator/configurator.component';
import { FormsModule } from '@angular/forms';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { MaterialModule } from '../../material/material.module';

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
        fixture = TestBed.createComponent(TeamDesiresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

// TODO Add more spec tests
