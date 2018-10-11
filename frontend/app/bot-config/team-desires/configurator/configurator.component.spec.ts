import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorComponent, EnumToArrayPipe } from './configurator.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { Condition } from '../../../services/ConfigurationFormat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfiguratorComponent', () => {
    let component: ConfiguratorComponent;
    let fixture: ComponentFixture<ConfiguratorComponent>;

    beforeEach(() => {
        const cond: Condition = {
            conditional: null,
            trigger: null,
            operator: null,
        };

        TestBed.configureTestingModule({
            declarations: [
                ConfiguratorComponent,
                EnumToArrayPipe,
            ],
            imports: [
                FormsModule,
                MaterialModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ConfiguratorComponent);
        component = fixture.componentInstance;
        component.condition = cond;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change conditional value to 0.25', () => {
        const condInput = fixture.nativeElement.querySelector('input');
        condInput.value = 0.25;

        condInput.dispatchEvent(new Event('input'));
        expect(component.condition.conditional).toEqual(0.25);
    });
});
