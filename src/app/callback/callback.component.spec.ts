import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import { LoadingComponent } from '../core/loading.component';

describe('CallbackComponent', () => {
    let component: CallbackComponent;
    let fixture: ComponentFixture<CallbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CallbackComponent,
                LoadingComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
