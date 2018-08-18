import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroughComponent } from './walkthrough.component';

describe('WalkthroughComponent', () => {
    let component: WalkthroughComponent;
    let fixture: ComponentFixture<WalkthroughComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WalkthroughComponent],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WalkthroughComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
