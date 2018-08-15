import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorComponent, EnumToArrayPipe } from './configurator.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ConfiguratorComponent', () => {
    let component: ConfiguratorComponent;
    let fixture: ComponentFixture<ConfiguratorComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                ConfiguratorComponent,
                EnumToArrayPipe,
            ],
            imports: [FormsModule],
        }).createComponent(ConfiguratorComponent);


        fixture.detectChanges();
        component = fixture.componentInstance;
        component.condition = {
            trigger: -1,
            operator: -1,
            conditional: -1,
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change conditional value to 0.25', () => {
        fixture.detectChanges();
        const hostEl = fixture.debugElement;
        const condInput: HTMLInputElement = hostEl.query(By.css('#conditionalInput'))
        .nativeElement;
        condInput.value = '0.25';
        condInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.condition.conditional).toEqual(0.25);
    });
});

// TODO add more spec tests
