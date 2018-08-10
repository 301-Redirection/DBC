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
                BotConfigDataService,
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
