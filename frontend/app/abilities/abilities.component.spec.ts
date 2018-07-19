import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';

import { AbilitiesComponent } from './abilities.component';

describe('AbilitiesComponent', () => {
    let component: AbilitiesComponent;
    let fixture: ComponentFixture<AbilitiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbilitiesComponent],
            imports: [
                SortablejsModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbilitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
