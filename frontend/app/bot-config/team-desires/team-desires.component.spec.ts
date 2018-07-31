import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { TeamDesiresComponent, ReversePipe } from './team-desires.component';
import { TeamDesiresService } from '../../services/team-desires.service';
import { EnumToArrayPipe } from './configurator/configurator.component';
import { CallbackComponent } from '../../callback/callback.component';
import { LoadingComponent } from '../../core/loading.component';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'configurator', template: '' })
class ConfiguratorComponent {
    @Input() condition;
}

describe('TeamDesiresComponent', () => {
    let component: TeamDesiresComponent;
    let fixture: ComponentFixture<TeamDesiresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeamDesiresComponent,
                ConfiguratorComponent,
                ReversePipe,
                EnumToArrayPipe,
                CallbackComponent,
                LoadingComponent,
            ],
            imports: [
                FormsModule,
            ],
            providers: [TeamDesiresService],
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
