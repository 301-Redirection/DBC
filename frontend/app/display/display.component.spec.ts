import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { DisplayComponent } from './display.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { Title, By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { BotConfigModule } from '../bot-config/bot-config.module';
import { CallbackComponent } from '../callback/callback.component';
import { LoadingComponent } from '../core/loading.component';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { ROUTE_NAMES } from '../routes/routes.config';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { FilterPipe } from '../pipes/filter.pipe';
import { BotConfigDataService } from '../services/bot-config-data.service';

describe('DisplayComponent', () => {
    let component: DisplayComponent;
    let fixture: ComponentFixture<DisplayComponent>;
    let router: Router;
    let location: Location;
    let auth: AuthService;

    beforeEach(async(() => {
        const testBots = {
            botConfigs: [
                {
                    id: 1,
                    name: 'Test Bot 1',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 hours ago',
                },
                {
                    id: 2,
                    name: 'Test Bot 2',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 weeks ago',
                },
                {
                    id: 3,
                    name: 'Test Bot 2',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 weeks ago',
                },
                {
                    id: 4,
                    name: 'Test Bot 2',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 weeks ago',
                },
                {
                    id: 5,
                    name: 'Test Bot 2',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 weeks ago',
                },
                {
                    id: 6,
                    name: 'Test Bot 2',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 weeks ago',
                },
                {
                    id: 7,
                    name: 'Test Bot 2',
                    description: 'This is the description of a bot script: ',
                    lastEdit: '2 weeks ago',
                },
            ],
        };

        const apiConnectServiceStub = jasmine
            .createSpyObj('ApiConnectService', ['recentBots', 'getAllBots']);
        const getQuoteSpy = apiConnectServiceStub.recentBots.and
            .returnValue(Observable.of(testBots));
        const getQuoteSp2 = apiConnectServiceStub.getAllBots.and
            .returnValue(Observable.of(testBots));
        TestBed.configureTestingModule({
            declarations: [
                DisplayComponent,
                CallbackComponent,
                LoadingComponent,
            ],
            imports: [
                NavbarModule,
                RouterTestingModule.withRoutes(ROUTES),
                HomeModule,
                BotConfigModule,
                FormsModule,
                SortablejsModule,
            ],
            providers: [
                FilterPipe,
                AuthService,
                AuthGuard,
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                HttpClient,
                HttpHandler,
                Location,
                { provide: Title, useClass: Title },
                BotConfigDataService,
            ],
        })
        .compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        auth = TestBed.get(AuthService);
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the title \'Dota 2 Bot Scripting - Dashboard\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Dashboard');
    }));

    // TODO: figure out how to send router data as in route.module.ts for dashboard
    it('should redirect to Configuration page on \'New Bot Configuration\' click', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#newConfigButton')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual(ROUTE_NAMES.BOT_CONFIGURATION);
        });
    }));

    it('should redirect to Manage page on \'View more bots\' click', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#viewMore')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual(ROUTE_NAMES.BOT_MANAGEMENT);
        });
    }));
});
