import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiConnectService } from '../../services/api-connect.service';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { AbilitiesComponent } from './abilities.component';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { HeroItemStubComponent } from '../../testing/hero-item-stub';

describe('AbilitiesComponent', () => {
    let component: AbilitiesComponent;
    let fixture: ComponentFixture<AbilitiesComponent>;

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
                ability_r: 'Fiend\'s Grip',
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

        const heroes = {
            heroes: heroesArray,
        };

        const isLoadedScript = true;

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', ['getAllHeroes']);
        const botConfigDataServiceStub = jasmine
            .createSpyObj('BotConfigDataService', [
                'getSelectedHeroes',
                'getSavedHeroAbilities',
                'getSavedHeroAbilityLevels',
                'getSavedHeroTalents',
                'updateHeroAbilities',
                'updateHeroTalents',
                'updateHeroAbilityLevels',
                'notifyIsLoadedScript',
            ]);

        apiConnectServiceStub.getAllHeroes.and
            .returnValue(Observable.of(heroes));

        botConfigDataServiceStub.getSelectedHeroes.and
            .returnValue(Observable.of(heroesArray));

        botConfigDataServiceStub.notifyIsLoadedScript.and
            .returnValue(Observable.of(isLoadedScript));

        TestBed.configureTestingModule({
            declarations: [
                AbilitiesComponent,
                HeroItemStubComponent,
            ],
            providers: [
                { provide: BotConfigDataService, useValue: botConfigDataServiceStub },
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbilitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should make q be first skill by default', (done) => {
        spyOn(component, 'createArrayFromPrios').and.callThrough();
        // console.log(component.currentHero);
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.detectChanges();
        expect(component.createArrayFromPrios).toHaveBeenCalled();
        const qLevel1 = fixture.debugElement.nativeElement
            .querySelector('#Q-1');
        expect(qLevel1.textContent).toBe('1');
        const wLevel1 = fixture.debugElement.nativeElement
            .querySelector('#W-1');
        expect(wLevel1.textContent).toBe('');
        const eLevel1 = fixture.debugElement.nativeElement
            .querySelector('#E-1');
        expect(eLevel1.textContent).toBe('');
        const rLevel1 = fixture.debugElement.nativeElement
            .querySelector('#R-1');
        expect(rLevel1.textContent).toBe('');
        const tLevel1 = fixture.debugElement.nativeElement
            .querySelector('#T-1');
        expect(tLevel1.textContent).toBe('');

        // Testing if the generated abilites will always be equal to max level for that ability
        let totalLevels: number = 0;
        let abilityType: any;
        let abilityLevel: any;
        const abilityTypes = ['Q', 'W', 'E', 'R', 'T'];
        const abilityMaxLevels = [4, 4, 4, 3, 4];

        for (let i = 0; i < abilityTypes.length; i += 1) {
            abilityType = abilityTypes[i];
            totalLevels = 0;
            for (let j = 1; j < 26; j += 1) {
                abilityLevel = fixture.debugElement.nativeElement
                    .querySelector(`#${abilityType}-${j}`);
                if (abilityLevel.textContent !== '') {
                    totalLevels += 1;
                }
            }
            expect(totalLevels).toBe(abilityMaxLevels[i]);
        }
        done();
    });

    it('should allow order of skills to change', (done) => {
        spyOn(component, 'createArrayFromPrios').and.callThrough();
        spyOn(component, 'prioritize').and.callThrough();
        fixture.debugElement.query(By.css('#btn-ability-prio-W-left'))
            .nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.detectChanges();
        expect(component.prioritize).toHaveBeenCalled();
        expect(component.createArrayFromPrios).toHaveBeenCalled();
        const qLevel1 = fixture.debugElement.nativeElement
            .querySelector('#Q-1');
        expect(qLevel1.textContent).toBe('');
        const wLevel1 = fixture.debugElement.nativeElement
            .querySelector('#W-1');
        expect(wLevel1.textContent).toBe('1');
        const eLevel1 = fixture.debugElement.nativeElement
            .querySelector('#E-1');
        expect(eLevel1.textContent).toBe('');
        const rLevel1 = fixture.debugElement.nativeElement
            .querySelector('#R-1');
        expect(rLevel1.textContent).toBe('');
        const tLevel1 = fixture.debugElement.nativeElement
            .querySelector('#T-1');
        expect(tLevel1.textContent).toBe('');
        done();
    });

    it('should allow order of skills to overwritten on click', (done) => {
        spyOn(component, 'createArrayFromPrios').and.callThrough();
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.nativeElement.querySelector('#W-1').click();
        fixture.detectChanges();
        expect(component.createArrayFromPrios).toHaveBeenCalled();
        const qLevel1 = fixture.debugElement.nativeElement
            .querySelector('#Q-1');
        expect(qLevel1.textContent).toBe('');
        const wLevel1 = fixture.debugElement.nativeElement
            .querySelector('#W-1');
        expect(wLevel1.textContent).toBe('1');
        const eLevel1 = fixture.debugElement.nativeElement
            .querySelector('#E-1');
        expect(eLevel1.textContent).toBe('');
        const rLevel1 = fixture.debugElement.nativeElement
            .querySelector('#R-1');
        expect(rLevel1.textContent).toBe('');
        const tLevel1 = fixture.debugElement.nativeElement
            .querySelector('#T-1');
        expect(tLevel1.textContent).toBe('');

        let totalLevels: number = 0;
        let abilityType: any;
        let abilityLevel: any;
        const abilityTypes = ['Q'];
        const abilityMaxLevels = [3];
        // there should only be 3 Qs, since first one was cancelled by clicking w-1

        for (let i = 0; i < abilityTypes.length; i += 1) {
            abilityType = abilityTypes[i];
            totalLevels = 0;
            for (let j = 1; j < 26; j += 1) {
                abilityLevel = fixture.debugElement.nativeElement
                    .querySelector(`#${abilityType}-${j}`);
                if (abilityLevel.textContent !== '') {
                    totalLevels += 1;
                }
            }
            expect(totalLevels).toBe(abilityMaxLevels[i]);
        }
        done();
    });

    it('should reset ability order if hero changed', (done) => {
        spyOn(component, 'createArrayFromPrios').and.callThrough();
        spyOn(component, 'onSelect').and.callThrough();

        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.detectChanges();
        // note component assumes first hero is selected, hence select 2nd one
        // console.log(fixture);
        fixture.debugElement.query(By.css('app-hero-item:nth-child(2)')).nativeElement.click();
        fixture.detectChanges();
        expect(component.createArrayFromPrios).toHaveBeenCalled();
        expect(component.onSelect).toHaveBeenCalled();
        const qLevel1 = fixture.debugElement.nativeElement
            .querySelector('#Q-1');
        expect(qLevel1.textContent).toBe('');
        const wLevel1 = fixture.debugElement.nativeElement
            .querySelector('#W-1');
        expect(wLevel1.textContent).toBe('');
        const eLevel1 = fixture.debugElement.nativeElement
            .querySelector('#E-1');
        expect(eLevel1.textContent).toBe('');
        const rLevel1 = fixture.debugElement.nativeElement
            .querySelector('#R-1');
        expect(rLevel1.textContent).toBe('');
        const tLevel1 = fixture.debugElement.nativeElement
            .querySelector('#T-1');
        expect(tLevel1.textContent).toBe('');

        // Testing if the generated abilites will always be equal to max level for that ability
        let totalLevels: number = 0;
        let abilityType: any;
        let abilityLevel: any;
        const abilityTypes = ['Q', 'W', 'E', 'R', 'T'];
        const abilityMaxLevels = [0, 0, 0, 0, 0];

        for (let i = 0; i < abilityTypes.length; i += 1) {
            abilityType = abilityTypes[i];
            totalLevels = 0;
            for (let j = 1; j < 26; j += 1) {
                abilityLevel = fixture.debugElement.nativeElement
                    .querySelector(`#${abilityType}-${j}`);
                if (abilityLevel.textContent !== '') {
                    totalLevels += 1;
                }
            }
            expect(totalLevels).toBe(abilityMaxLevels[i]);
        }
        done();
    });

    it('should set ability order of hero when changed back to that hero', (done) => {
        spyOn(component, 'createArrayFromPrios').and.callThrough();
        spyOn(component, 'onSelect').and.callThrough();

        // note second hero has prio on w and initial hero has default prio on q
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('app-hero-item:nth-child(2)')).nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#btn-ability-prio-W-left'))
            .nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('app-hero-item:nth-child(1)')).nativeElement.click();
        fixture.detectChanges();
        expect(component.createArrayFromPrios).toHaveBeenCalled();
        expect(component.onSelect).toHaveBeenCalled();
        const qLevel1 = fixture.debugElement.nativeElement
            .querySelector('#Q-1');
        expect(qLevel1.textContent).toBe('1');
        const wLevel1 = fixture.debugElement.nativeElement
            .querySelector('#W-1');
        expect(wLevel1.textContent).toBe('');
        const eLevel1 = fixture.debugElement.nativeElement
            .querySelector('#E-1');
        expect(eLevel1.textContent).toBe('');
        const rLevel1 = fixture.debugElement.nativeElement
            .querySelector('#R-1');
        expect(rLevel1.textContent).toBe('');
        const tLevel1 = fixture.debugElement.nativeElement
            .querySelector('#T-1');
        expect(tLevel1.textContent).toBe('');

        // Testing if the generated abilites will always be equal to max level for that ability
        let totalLevels: number = 0;
        let abilityType: any;
        let abilityLevel: any;
        const abilityTypes = ['Q', 'W', 'E', 'R', 'T'];
        const abilityMaxLevels = [4, 4, 4, 3, 4];

        for (let i = 0; i < abilityTypes.length; i += 1) {
            abilityType = abilityTypes[i];
            totalLevels = 0;
            for (let j = 1; j < 26; j += 1) {
                abilityLevel = fixture.debugElement.nativeElement
                    .querySelector(`#${abilityType}-${j}`);
                if (abilityLevel.textContent !== '') {
                    totalLevels += 1;
                }
            }
            expect(totalLevels).toBe(abilityMaxLevels[i]);
        }
        done();
    });

    it('should allow talent button to open modal and call talent select', (done) => {
        spyOn(component, 'onTalentSelect').and.callThrough();
        fixture.debugElement.query(By.css('.btn-talent')).nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#talent-25-left')).nativeElement.click();
        fixture.detectChanges();
        expect(component.onTalentSelect).toHaveBeenCalled();
        done();
    });
});
