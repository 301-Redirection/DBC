import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorComponent, EnumToArrayPipe } from './configurator.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Condition } from '../../../services/ConfigurationFormat';

describe('ConfiguratorComponent', () => {
    let component: ConfiguratorComponent;
    let fixture: ComponentFixture<ConfiguratorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfiguratorComponent,
                EnumToArrayPipe,
            ],
            imports: [FormsModule],
        }).compileComponents();
        fixture = TestBed.createComponent(ConfiguratorComponent);

        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change conditional value to 0.25', () => {
        const condInput = fixture.nativeElement.querySelector('#conditionalInput');
        component.condition = new Condition();
        // {
        //     trigger: -1,
        //     operator: -1,
        //     conditional: -5,
        // };
        condInput.value = 0.25;

        condInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.condition.conditional).toEqual(0.25);
    });
});

// TODO add more spec tests
