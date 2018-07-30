import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsComponent],
            imports: [SortablejsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
