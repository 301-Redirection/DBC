import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AbilitiesComponent } from './abilities.component';

describe('AbilitiesComponent', () => {
    let component: AbilitiesComponent;
    let fixture: ComponentFixture<AbilitiesComponent>;

    beforeEach(async(() => {
        const heroes = {
            heroes: [
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
            ],
        };

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', ['getAllHeroes']);
        const getQuoteSpy = apiConnectServiceStub.getAllHeroes.and
            .returnValue(Observable.of(heroes));

        TestBed.configureTestingModule({
            declarations: [AbilitiesComponent],
            imports: [
                SortablejsModule,
            ],
            providers: [
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                HttpClient,
                HttpHandler,
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
