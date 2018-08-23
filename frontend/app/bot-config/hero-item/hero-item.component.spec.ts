import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroItemComponent } from './hero-item.component';

describe('HeroItemComponent', () => {
    let component: HeroItemComponent;
    let fixture: ComponentFixture<HeroItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeroItemComponent],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroItemComponent);
        component = fixture.componentInstance;
        component.hero = { id: 'bloodMage' };
        fixture.detectChanges();
    });

    it('should create', (done) => {
        expect(component).toBeTruthy();
        done();
    });
});
