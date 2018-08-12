import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AbilitiesComponent } from './abilities.component';
import { TeamDesiresComponent, ReversePipe } from '../team-desires/team-desires.component';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { BotConfigComponent } from '../bot-config.component';
import { DisplayComponent } from '../../display/display.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { ItemsComponent } from '../items/items.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../../routes/routes.module';
import { HomeModule } from '../../home/home.module';
import { BotConfigModule } from '../bot-config.module';
import { NavbarModule } from '../../navbar/navbar.module';
import { AuthService } from '../../auth/auth.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CallbackComponent } from '../../callback/callback.component';
import { LoadingComponent } from '../../core/loading.component';
import { AuthGuard } from '../../auth/auth.guard';
import { MaterialModule } from '../../material/material.module';
import {
    ConfiguratorComponent,
    EnumToArrayPipe,
} from '../team-desires/configurator/configurator.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AbilitiesComponent', () => {
    let component: AbilitiesComponent;
    let fixture: ComponentFixture<AbilitiesComponent>;

    beforeEach(async(() => {
        const heroesArray = [
            {
                url: '/static/heroes/images/bloodseeker.png',
                primaryAttribute: 'agi',
                ability_q: 'Bloodrage',
                ability_w: 'Blood Rite',
                ability_e: 'Thirst',
                ability_r: 'Rupture',
                movespeed: 285,
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
                url: '/static/heroes/images/bane.png',
                primaryAttribute: 'int',
                ability_q: 'Enfeeble',
                ability_w: 'Brain Sap',
                ability_e: 'Nightmare',
                ability_r: 'Fiend\'s Grip',
                movespeed: 310,
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

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', ['getAllHeroes']);
        const botConfigDataServiceStub = jasmine
            .createSpyObj('BotConfigDataService', ['getSelectedHeroes']);
        const getQuoteSpy = apiConnectServiceStub.getAllHeroes.and
            .returnValue(Observable.of(heroes));
        const getDataSpy = botConfigDataServiceStub.getSelectedHeroes.and
            .returnValue(Observable.of(heroesArray));

        TestBed.configureTestingModule({
            declarations: [
                AbilitiesComponent,
                BotConfigComponent,
                TeamDesiresComponent,
                HeroesComponent,
                ItemsComponent,
                ConfiguratorComponent,
                CallbackComponent,
                DisplayComponent,
                LoadingComponent,
                FilterPipe,
                ReversePipe,
                EnumToArrayPipe,
            ],
            imports: [
                SortablejsModule,
                FormsModule,
                RouterTestingModule.withRoutes(ROUTES),
                HomeModule,
                NavbarModule,
                MaterialModule,
            ],
            providers: [
                AuthService,
                AuthGuard,
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                HttpClient,
                HttpHandler,
                { provide: BotConfigDataService, useValue: botConfigDataServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbilitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should make q be first skill by default', () => {
        spyOn(component, 'createArrayFromPrios');

        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.createArrayFromPrios).toHaveBeenCalled();
            const qLevel1 = fixture.debugElement.nativeElement
                .querySelector('#Q-1');
            expect(qLevel1.text()).toBe('1');
            const wLevel1 = fixture.debugElement.nativeElement
                .querySelector('#W-1');
            expect(wLevel1.text()).toBe('');
            const eLevel1 = fixture.debugElement.nativeElement
                .querySelector('#E-1');
            expect(eLevel1.text()).toBe('');
            const rLevel1 = fixture.debugElement.nativeElement
                .querySelector('#R-1');
            expect(rLevel1.text()).toBe('');
            const tLevel1 = fixture.debugElement.nativeElement
                .querySelector('#T-1');
            expect(tLevel1.text()).toBe('');

            // Testing if the generated abilites will always be equal to max level for that ability
            let totalLevels: number = 0;
            let abilityType: any;
            let abilityLevel: any;
            const abilityTypes = ['Q', 'W', 'E', 'R', 'T'];
            const abilityMaxLevels = [4, 4, 4, 3, 4];

            for (let i = 0; abilityTypes.length; i += 1) {
                abilityType = abilityTypes[i];
                totalLevels = 0;
                for (let j = 1; j < 26; j += 1) {
                    abilityLevel = fixture.debugElement.nativeElement
                        .querySelector(`#{abilityType}-${j}`);
                    if (abilityLevel.text() !== '') {
                        totalLevels += 1;
                    }
                }
                expect(totalLevels).toBe(abilityMaxLevels[i]);
            }
        });
    });

    it('should allow order of skills to change', () => {
        spyOn(component, 'createArrayFromPrios');
        spyOn(component, 'prioritize');
        fixture.debugElement.query(By.css('#btn-ability-prio-W-left'))
            .nativeElement.click();
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.prioritize).toHaveBeenCalled();
            expect(component.createArrayFromPrios).toHaveBeenCalled();
            const qLevel1 = fixture.debugElement.nativeElement
                .querySelector('#Q-1');
            expect(qLevel1.text()).toBe('');
            const wLevel1 = fixture.debugElement.nativeElement
                .querySelector('#W-1');
            expect(wLevel1.text()).toBe('1');
            const eLevel1 = fixture.debugElement.nativeElement
                .querySelector('#E-1');
            expect(eLevel1.text()).toBe('');
            const rLevel1 = fixture.debugElement.nativeElement
                .querySelector('#R-1');
            expect(rLevel1.text()).toBe('');
            const tLevel1 = fixture.debugElement.nativeElement
                .querySelector('#T-1');
            expect(tLevel1.text()).toBe('');
        });
    });

    it('should allow order of skills to overwritten on click', () => {
        spyOn(component, 'createArrayFromPrios');
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.debugElement.nativeElement.querySelector('#W-1').click();
        fixture.whenStable().then(() => {
            expect(component.createArrayFromPrios).toHaveBeenCalled();
            const qLevel1 = fixture.debugElement.nativeElement
                .querySelector('#Q-1');
            expect(qLevel1.text()).toBe('');
            const wLevel1 = fixture.debugElement.nativeElement
                .querySelector('#W-1');
            expect(wLevel1.text()).toBe('1');
            const eLevel1 = fixture.debugElement.nativeElement
                .querySelector('#E-1');
            expect(qLevel1.text()).toBe('');
            const rLevel1 = fixture.debugElement.nativeElement
                .querySelector('#R-1');
            expect(qLevel1.text()).toBe('');
            const tLevel1 = fixture.debugElement.nativeElement
                .querySelector('#T-1');
            expect(qLevel1.text()).toBe('');

            let totalLevels: number = 0;
            let abilityType: any;
            let abilityLevel: any;
            const abilityTypes = ['Q'];
            const abilityMaxLevels = [3];
            // there should only be 3 Qs, since first one was cancelled by clicking w-1

            for (let i = 0; abilityTypes.length; i += 1) {
                abilityType = abilityTypes[i];
                totalLevels = 0;
                for (let j = 1; j < 26; j += 1) {
                    abilityLevel = fixture.debugElement.nativeElement
                        .querySelector(`#{abilityType}-${j}`);
                    if (abilityLevel.text() !== '') {
                        totalLevels += 1;
                    }
                }
                expect(totalLevels).toBe(abilityMaxLevels[i]);
            }
        });
    });

    it('should reset ability order if hero changed', () => {
        spyOn(component, 'createArrayFromPrios');
        spyOn(component, 'onSelect');

        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        // note component assumes first hero is selected, hence select 2nd one
        fixture.debugElement.query(By.css('.hero-item:nth-child(2)')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.createArrayFromPrios).toHaveBeenCalled();
            expect(component.onSelect).toHaveBeenCalled();
            const qLevel1 = fixture.debugElement.nativeElement
                .querySelector('#Q-1');
            expect(qLevel1.text()).toBe('');
            const wLevel1 = fixture.debugElement.nativeElement
                .querySelector('#W-1');
            expect(wLevel1.text()).toBe('');
            const eLevel1 = fixture.debugElement.nativeElement
                .querySelector('#E-1');
            expect(eLevel1.text()).toBe('');
            const rLevel1 = fixture.debugElement.nativeElement
                .querySelector('#R-1');
            expect(rLevel1.text()).toBe('');
            const tLevel1 = fixture.debugElement.nativeElement
                .querySelector('#T-1');
            expect(tLevel1.text()).toBe('');

            // Testing if the generated abilites will always be equal to max level for that ability
            let totalLevels: number = 0;
            let abilityType: any;
            let abilityLevel: any;
            const abilityTypes = ['Q', 'W', 'E', 'R', 'T'];
            const abilityMaxLevels = [0, 0, 0, 0, 0];

            for (let i = 0; abilityTypes.length; i += 1) {
                abilityType = abilityTypes[i];
                totalLevels = 0;
                for (let j = 1; j < 26; j += 1) {
                    abilityLevel = fixture.debugElement.nativeElement
                        .querySelector(`#{abilityType}-${j}`);
                    if (abilityLevel.text() !== '') {
                        totalLevels += 1;
                    }
                }
                expect(totalLevels).toBe(abilityMaxLevels[i]);
            }
        });
    });

    it('should set ability order of hero when changed back to that hero', () => {
        spyOn(component, 'createArrayFromPrios');
        spyOn(component, 'onSelect');

        // note second hero has prio on w and initial hero has default prio on q
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.debugElement.query(By.css('.hero-item:nth-child(2)')).nativeElement.click();
        fixture.debugElement.query(By.css('#btn-ability-prio-W-left'))
            .nativeElement.click();
        fixture.debugElement.query(By.css('#ability-generate')).nativeElement.click();
        fixture.debugElement.query(By.css('.hero-item:nth-child(1)')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.createArrayFromPrios).toHaveBeenCalled();
            expect(component.onSelect).toHaveBeenCalled();
            const qLevel1 = fixture.debugElement.nativeElement
                .querySelector('#Q-1');
            expect(qLevel1.text()).toBe('1');
            const wLevel1 = fixture.debugElement.nativeElement
                .querySelector('#W-1');
            expect(wLevel1.text()).toBe('');
            const eLevel1 = fixture.debugElement.nativeElement
                .querySelector('#E-1');
            expect(eLevel1.text()).toBe('');
            const rLevel1 = fixture.debugElement.nativeElement
                .querySelector('#R-1');
            expect(rLevel1.text()).toBe('');
            const tLevel1 = fixture.debugElement.nativeElement
                .querySelector('#T-1');
            expect(tLevel1.text()).toBe('');

            // Testing if the generated abilites will always be equal to max level for that ability
            let totalLevels: number = 0;
            let abilityType: any;
            let abilityLevel: any;
            const abilityTypes = ['Q', 'W', 'E', 'R', 'T'];
            const abilityMaxLevels = [4, 4, 4, 3, 4];

            for (let i = 0; abilityTypes.length; i += 1) {
                abilityType = abilityTypes[i];
                totalLevels = 0;
                for (let j = 1; j < 26; j += 1) {
                    abilityLevel = fixture.debugElement.nativeElement
                        .querySelector(`#{abilityType}-${j}`);
                    if (abilityLevel.text() !== '') {
                        totalLevels += 1;
                    }
                }
                expect(totalLevels).toBe(abilityMaxLevels[i]);
            }
        });
    });

    it('should allow talent button to open modal and call talent select', () => {
        spyOn(component, 'onTalentSelect');
        fixture.debugElement.query(By.css('.btn-talent')).nativeElement.click();
        fixture.debugElement.query(By.css('#talent-25-left')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.onTalentSelect).toHaveBeenCalled();
        });
    });
});
