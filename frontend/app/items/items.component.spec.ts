import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';
import { ItemsComponent } from './items.component';
import { Observable } from 'rxjs/Rx';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        const testItems = {
            items: [{
                id: 1,
                name: 'blink',
                cost: 2250,
                components: 'null',
                niceName: 'Blink Dagger',
                type: 0,
                createdAt: '2018-07-30T22:00:01.000Z',
                updatedAt: '2018-07-30T22:00:01.000Z',
                url: '/static/items/images/1.png',
            }, {
                id: 2,
                name: 'blades_of_attack',
                cost: 430,
                components: 'null',
                niceName: 'Blades of Attack',
                type: 0,
                createdAt: '2018-07-30T22:00:01.000Z',
                updatedAt: '2018-07-30T22:00:01.000Z',
                url: '/static/items/images/2.png',
            }],
        };
        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', [
            'getAllItems',
            'getItemImageURL',
        ]);
        apiConnectServiceStub.getAllItems.and
            .returnValue(Observable.of(testItems));
        apiConnectServiceStub.getItemImageURL.and.callThrough();

        TestBed.configureTestingModule({
            declarations: [ItemsComponent],
            imports: [SortablejsModule],
            providers: [
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
