import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { ItemsComponent } from './items.component';
import { Observable } from 'rxjs/Rx';
import { FilterPipe } from '../../pipes/filter.pipe';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { FormsModule } from '@angular/forms';
import { HeroItemStubComponent } from '../../testing/hero-item-stub';
import { By } from '@angular/platform-browser';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    const testItems = {
        items: [
            {
                id: 1,
                name: 'blink',
                cost: 2250,
                components: 'null',
                niceName: 'Blink Dagger',
                type: 0,
                createdAt: '2018-07-30T22:00:01.000Z',
                updatedAt: '2018-07-30T22:00:01.000Z',
                url: '/static/items/images/1.png',
            },
            {
                id: 2,
                name: 'blades_of_attack',
                cost: 430,
                components: 'null',
                niceName: 'Blades of Attack',
                type: 0,
                createdAt: '2018-07-30T22:00:01.000Z',
                updatedAt: '2018-07-30T22:00:01.000Z',
                url: '/static/items/images/2.png',
            },
            {
                id: 16,
                name: 'branches',
                cost: 50,
                components: 'null',
                niceName: 'Iron Branch',
                type: 0,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: 'http://localhost:3000/static/items/images/16.png',
            },
            {
                id: 34,
                name: 'magic_stick',
                cost: 200,
                components: 'null',
                niceName: 'Magic Stick',
                type: 0,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: 'http://localhost:3000/static/items/images/34.png',
            },
            {
                id: 35,
                name: 'recipe_magic_wand',
                cost: 150,
                components: 'null',
                niceName: 'Recipe: Magic Wand',
                type: 3,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: '../../assets/images/recipe-icon.png',
            },
        ],
    };

    const itemWithComponents = {
        id: 36,
        name: 'magic_wand',
        cost: 450,
        components: [
            {
                id: 16,
                name: 'branches',
                cost: 50,
                components: 'null',
                niceName: 'Iron Branch',
                type: 0,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: 'http://localhost:3000/static/items/images/16.png',
            },
            {
                id: 16,
                name: 'branches',
                cost: 50,
                components: 'null',
                niceName: 'Iron Branch',
                type: 0,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: 'http://localhost:3000/static/items/images/16.png',
            },
            {
                id: 35,
                name: 'recipe_magic_wand',
                cost: 150,
                components: 'null',
                niceName: 'Recipe: Magic Wand',
                type: 3,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: '../../assets/images/recipe-icon.png',
            },
            {
                id: 34,
                name: 'magic_stick',
                cost: 200,
                components: 'null',
                niceName: 'Magic Stick',
                type: 0,
                createdAt: '2018-10-08T09:55:53.000Z',
                updatedAt: '2018-10-08T09:55:53.000Z',
                url: 'http://localhost:3000/static/items/images/34.png',
            },
        ],
        niceName: 'Magic Wand',
        type: 2,
        createdAt: '2018-10-08T09:55:53.000Z',
        updatedAt: '2018-10-08T09:55:53.000Z',
        url: 'http://localhost:3000/static/items/images/36.png',
    }; // Magic wand
    beforeEach(async(() => {
        const heroesArray = [
            {
                name: 'bloodseeker',
                url: '/static/heroes/images/bloodseeker.png',
                primaryAttribute: 'agi',
                ability_q: 'Bloodrage',
                ability_w: 'Blood Rite',
                ability_e: 'Thirst',
                ability_r: 'Rupture',
                moveSpeed: 285,
                armor: 3.36,
                attackDamageMin: 33,
                attackDamageMax: 39,
                attackRate: null,
                attackRange: null,
                baseStrength: 24,
                baseStrengthGain: 2.7,
                baseAgility: 24,
                baseAgilityGain: 3,
                baseIntelligence: 18,
                baseIntelligenceGain: 1.7,
                url_q: '/static/abilities/images/bloodseeker_q.png',
                url_w: '/static/abilities/images/bloodseeker_w.png',
                url_e: '/static/abilities/images/bloodseeker_e.png',
                url_r: '/static/abilities/images/bloodseeker_r.png',
            },
            {
                name: 'bane',
                url: '/static/heroes/images/bane.png',
                primaryAttribute: 'int',
                ability_q: 'Enfeeble',
                ability_w: 'Brain Sap',
                ability_e: 'Nightmare',
                ability_r: 'Fiend',
                moveSpeed: 310,
                armor: 4.22,
                attackDamageMin: 35,
                attackDamageMax: 41,
                attackRate: null,
                attackRange: null,
                baseStrength: 23,
                baseStrengthGain: 2.4,
                baseAgility: 23,
                baseAgilityGain: 2.4,
                baseIntelligence: 23,
                baseIntelligenceGain: 2.4,
                url_q: '/static/abilities/images/bane_q.png',
                url_w: '/static/abilities/images/bane_w.png',
                url_e: '/static/abilities/images/bane_e.png',
                url_r: '/static/abilities/images/bane_r.png',
            },
        ];

        const apiConnectServiceStub = jasmine.createSpyObj(
            'ApiConnectService',
            ['getAllItems', 'getItemImageURL'],
        );
        apiConnectServiceStub.getAllItems.and.returnValue(
            Observable.of(testItems),
        );

        apiConnectServiceStub.getItemImageURL.and.callThrough();

        const botConfigDataServiceStub = jasmine.createSpyObj(
            'BotConfigDataService',
            [
                'getSelectedHeroes',
                'getHeroItemSelection',
                'updateHeroItems',
                'notifyIsLoadedScript',
            ],
        );

        botConfigDataServiceStub.getSelectedHeroes.and.returnValue(
            Observable.of(heroesArray),
        );

        botConfigDataServiceStub.updateHeroItems.and.returnValue(
            true,
        );
        botConfigDataServiceStub.notifyIsLoadedScript.and.returnValue(
            Observable.of(false),
        );

        TestBed.configureTestingModule({
            declarations: [ItemsComponent, FilterPipe, HeroItemStubComponent],
            imports: [SortablejsModule, FormsModule],
            providers: [
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                {
                    provide: BotConfigDataService,
                    useValue: botConfigDataServiceStub,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.heroItemSelection[0] = [];
        component.selectedHeroIndex = 0;
        component.currentHero = component.selectedHeroes[0];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add item to selectedItem list', () => {
        const item1 = testItems.items[0];
        const item2 = testItems.items[1];
        component.selectedItem = item1;
        component.addItemToList(item1);
        component.selectedItem = item2;
        component.addItemToList(item2);
        expect(component.heroItemSelection[0]).toEqual([item1, item2]);
    });

    it('should add an item with components correctly selectedItem list', () => {
        component.selectedItem = itemWithComponents;
        component.addItemToList(itemWithComponents);
        expect(component.heroItemSelection[0]).toEqual([itemWithComponents]);
    });

    it('should absorb components already in selectedItem list', () => {
        const item1 = testItems.items[2];
        component.selectedItem = item1;
        component.addItemToList(item1);
        component.selectedItem = item1;
        component.addItemToList(item1);
        component.selectedItem = itemWithComponents;
        component.addItemToList(itemWithComponents);
        expect(component.heroItemSelection[0]).toEqual([itemWithComponents]);
    });

    it('should remove an item from selectedItem list correctly', () => {
        const item1 = testItems.items[2];
        const item2 = testItems.items[3];
        component.selectedItem = item1;
        component.addItemToList(item1);
        component.selectedItem = item2;
        component.addItemToList(item2);
        component.selectedItem = item1;
        component.removeItemFromList(item1);
        expect(component.heroItemSelection[0]).toEqual([item2]);
    });

    it('should remove an items from selectedItem list, check empty array', () => {
        const item1 = testItems.items[2];
        const item2 = testItems.items[3];
        component.selectedItem = item1;
        component.addItemToList(item1);
        component.selectedItem = item2;
        component.addItemToList(item2);
        component.selectedItem = item1;
        component.removeItemFromList(item1);
        component.selectedItem = item2;
        component.removeItemFromList(item2);
        expect(component.heroItemSelection[0].length).toEqual(0);
        expect(component.totalCostPerHero[0]).toBe(0);
    });

    it('should add items for different heroes correctly', () => {
        const item1H1 = testItems.items[0];
        const item2H1 = testItems.items[1];
        const item1H2 = testItems.items[2];
        const item2H2 = testItems.items[3];

        const costH1 = item1H1.cost + item2H1.cost;
        const costH2 = item1H2.cost + item2H2.cost;
        // Hero 1
        component.selectedItem = item1H1;
        component.addItemToList(item1H1);
        component.selectedItem = item2H1;
        component.addItemToList(item2H1);
        // hero 2
        component.selectedHeroIndex = 1;
        component.currentHero = component.selectedHeroes[1];
        component.selectedItem = item1H2;
        component.addItemToList(item1H2);
        component.selectedItem = item2H2;
        component.addItemToList(item2H2);
        expect(component.heroItemSelection[0]).toEqual([item1H1, item2H1]);
        expect(component.heroItemSelection[1]).toEqual([item1H2, item2H2]);
        // Check total cost for each hero calculated correctly
        expect(component.totalCostPerHero[0]).toEqual(costH1);
        expect(component.totalCostPerHero[1]).toEqual(costH2);
    });

    it('should add clear all items for selected hero if dustbin icon is clicked', () => {
        const item1H1 = testItems.items[0];
        const item2H1 = testItems.items[1];
        // Hero 1
        component.selectedItem = item1H1;
        component.addItemToList(item1H1);
        component.selectedItem = item2H1;
        component.addItemToList(item2H1);
        // click hero items delete button
        fixture.debugElement.query(By.css('#clearHeroItemsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.heroItemSelection[0].length).toEqual(0);
        expect(component.totalCostPerHero[0]).toEqual(0);
    });
});
