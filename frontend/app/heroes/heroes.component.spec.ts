import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FilterPipe } from '../pipes/filter.pipe';
import { Observable } from 'rxjs/Rx';
import { HeroesService } from '../services/heroes.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { HomeModule } from '../home/home.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { BotConfigModule } from '../bot-config/bot-config.module';
import { BotManagementModule } from '../bot-management/bot-management.module';
import { ItemsModule } from '../items/items.module';
import { AbilitiesComponent } from '../abilities/abilities.component';
import { CallbackComponent } from '../callback/callback.component';
import { LoadingComponent } from '../core/loading.component';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let router: Router;
    let location: Location;
    let auth: AuthService;

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
                        movespeed: 310,
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
                    movespeed: 310,
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
                CallbackComponent,
                LoadingComponent,
                HeroesComponent,
                AbilitiesComponent,
            ],
            imports: [
                FormsModule,
                SortablejsModule,
                RouterTestingModule.withRoutes(ROUTES),
                HomeModule,
                BotConfigModule,
                BotManagementModule,
                FormsModule,
                ItemsModule,
                SortablejsModule,
                DashboardModule,
            ],
            providers: [
                AuthService,
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                HttpClient,
                HttpHandler,
                HeroesService,
            ],
        })
        .compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        auth = TestBed.get(AuthService);
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
