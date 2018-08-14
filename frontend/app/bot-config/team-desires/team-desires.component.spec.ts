import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../../routes/routes.module';
import { TeamDesiresComponent, ReversePipe } from './team-desires.component';
import { EnumToArrayPipe } from './configurator/configurator.component';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from '../../../../node_modules/angular-sortablejs/dist';
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
                SortablejsModule,
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
