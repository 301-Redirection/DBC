import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes.component';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth/auth.service';
import { authServiceStub } from '../../testing/auth-service-stub';
import { FilterPipe } from '../../pipes/filter.pipe';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { HeroItemStubComponent } from '../../testing/hero-item-stub';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(async(() => {
        const testResponse = {
            heroes: [
                {
                    id: 1,
                    programName: 'antimage',
                    niceName: 'Anti-Mage',
                    roles: 'Carry - Escape - Nuker',
                    createdAt: '2018-07-19T18:50:42.000Z',
                    updatedAt: '2018-07-19T18:50:42.000Z',
                    heroStats: {
                        id: 1,
                        primaryAttribute: 'agi',
                        ability_q: 'Mana Break',
                        ability_w: 'Blink',
                        ability_e: 'Spell Shield',
                        ability_r: 'Mana Void',
                        moveSpeed: 310,
                        armor: 2.08,
                        attackDamageMin: 29,
                        attackDamageMax: 33,
                        attackRate: null,
                        attackRange: null,
                        baseStrength: 23,
                        baseStrengthGain: 1.3,
                        baseAgility: 22,
                        baseAgilityGain: 2.8,
                        baseIntelligence: 12,
                        baseIntelligenceGain: 1.8,
                        heroId: 1,
                        createdAt: '2018-07-19T18:53:35.000Z',
                        updatedAt: '2018-07-19T18:53:35.000Z',
                    },
                    url: '/static/heroes/images/antimage.png',
                    primaryAttribute: 'agi',
                    ability_q: 'Mana Break',
                    ability_w: 'Blink',
                    ability_e: 'Spell Shield',
                    ability_r: 'Mana Void',
                    moveSpeed: 310,
                    armor: 2.08,
                    attackDamageMin: 29,
                    attackDamageMax: 33,
                    attackRate: null,
                    attackRange: null,
                    baseStrength: 23,
                    baseStrengthGain: 1.3,
                    baseAgility: 22,
                    baseAgilityGain: 2.8,
                    baseIntelligence: 12,
                    baseIntelligenceGain: 1.8,
                    url_q: '/static/abilities/images/antimage_q.png',
                    url_w: '/static/abilities/images/antimage_w.png',
                    url_e: '/static/abilities/images/antimage_e.png',
                    url_r: '/static/abilities/images/antimage_r.png',
                },
            ],
        };

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', [
            'getAllHeroes',
            'getImageURL',
        ]);

        apiConnectServiceStub.getAllHeroes.and
            .returnValue(Observable.of(testResponse));

        apiConnectServiceStub.getImageURL.and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FilterPipe,
                HeroItemStubComponent,
            ],
            imports: [
                FormsModule,
                SortablejsModule,
            ],
            providers: [
                { provide: AuthService, useValue: authServiceStub },
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                BotConfigDataService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add hero on double click', (done) => {
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        expect(component.allHeroes[0]).toEqual(component.selectedHeroesList[0]);
        done();
    });

    it('should remove hero', (done) => {
        // Add hero item
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        // Remove here item
        component.removeHero(component.selectedHeroesList[0], component.pools[0]);
        fixture.detectChanges();
        expect(component.selectedHeroesList).toEqual([]);
        expect(component.pools[0]).toEqual([]);
        done();
    });

    it('should clear heroes on reset', (done) => {
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        spyOn(window, 'confirm').and.returnValue(true);
        fixture.debugElement.query(By.css('#resetPoolsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        expect(component.selectedHeroesList).toEqual([]);
        expect(component.pools[0]).toEqual([]);
        expect(component.pools[1]).toEqual([]);
        expect(component.pools[2]).toEqual([]);
        expect(component.pools[3]).toEqual([]);
        expect(component.pools[4]).toEqual([]);
        done();
    });

    it('should toggle pools on toggle button press', (done) => {
        const oldNumberOfPools = component.numberOfPools;
        const oldPartitioned = component.partitioned;
        spyOn(window, 'confirm').and.returnValue(true);
        fixture.debugElement.query(By.css('#togglePoolsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        let newNumberOfPools = 0;
        if (oldNumberOfPools === 1) {
            newNumberOfPools = 5;
        } else {
            newNumberOfPools = 1;
        }
        expect(component.numberOfPools).toEqual(newNumberOfPools);
        expect(component.partitioned).toEqual(!oldPartitioned);
        done();
    });

    it('should not allow duplicate heroes to be added to a pool', (done) => {
        spyOn(window, 'alert');
        // Add hero item
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        // Attempt to add same hero
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        expect(window.alert)
            .toHaveBeenCalledWith('This hero already exists in the selected pool.');
        expect(component.pools[0].length).toEqual(1);
        expect(component.pools[1]).toEqual([]);
        expect(component.pools[2]).toEqual([]);
        expect(component.pools[3]).toEqual([]);
        expect(component.pools[4]).toEqual([]);
        done();
    });

    it('should add heroes to first pool when toggled to multiple pools', (done) => {
        spyOn(window, 'confirm').and.returnValue(true);
        // Add hero item
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        // Change pools to multiple pools
        fixture.debugElement.query(By.css('#togglePoolsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.pools[0][0]['id']).toEqual(component.selectedHeroesList[0]['id']);
        expect(component.pools[1]).toEqual([]);
        expect(component.pools[2]).toEqual([]);
        expect(component.pools[3]).toEqual([]);
        expect(component.pools[4]).toEqual([]);
        done();
    });

    it('should not add duplicates heroes when toggling to single pool', (done) => {
        spyOn(window, 'confirm').and.returnValue(true);
        // Change from single pool to multiple pools
        fixture.debugElement.query(By.css('#togglePoolsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        // Add hero item
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        // Select Pool 2 tab
        fixture.debugElement.query(By.css('#poolLink1'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        // Add hero item
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        // Change from multiple pools to single pool
        fixture.debugElement.query(By.css('#togglePoolsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        const numHeroesInPool1 = component.pools[0].length;
        expect(numHeroesInPool1).toEqual(1);
        expect(component.pools[1]).toEqual([]);
        expect(component.pools[2]).toEqual([]);
        expect(component.pools[3]).toEqual([]);
        expect(component.pools[4]).toEqual([]);
        done();
    });

    it('should not allow duplicate heroes in partitioned pools', (done) => {
        spyOn(window, 'alert').and.returnValue(true);
        spyOn(window, 'confirm').and.returnValue(true);
        // Change from single pool to multiple pools
        fixture.debugElement.query(By.css('#togglePoolsBtn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
         // Select Pool 2 tab
        fixture.debugElement.query(By.css('#poolLink1'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        // Add hero item
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        // Attempt to add hero item again
        fixture.debugElement.query(By.css('app-hero-item'))
            .triggerEventHandler('dblclick', new MouseEvent('dblclick'));
        fixture.detectChanges();
        expect(component.pools[1].length).toEqual(1);
        expect(component.pools[0]).toEqual([]);
        expect(component.pools[2]).toEqual([]);
        expect(component.pools[3]).toEqual([]);
        expect(component.pools[4]).toEqual([]);
        done();
    });
});
