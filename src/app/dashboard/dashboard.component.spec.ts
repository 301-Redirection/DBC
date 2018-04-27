import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { Title, By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { DashboardModule } from './dashboard.module';
import { BotConfigModule } from '../bot-config/bot-config.module';
import { BotManagementModule } from '../bot-management/bot-management.module';
import { CallbackComponent } from '../callback/callback.component';
import { LoadingComponent } from '../core/loading.component';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { ROUTE_NAMES } from '../routes/routes.config';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;
    let location: Location;
    let auth: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                CallbackComponent,
                LoadingComponent,
            ],
            imports: [
                NavbarModule,
                RouterTestingModule.withRoutes(ROUTES),
                HomeModule,
                BotConfigModule,
                BotManagementModule,
            ],
            providers: [
                AuthService,
                AuthGuard,
                ApiConnectService,
                HttpClient,
                HttpHandler,
                Location,
                { provide: Title, useClass: Title },
            ],
        })
        .compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        auth = TestBed.get(AuthService);
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
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
