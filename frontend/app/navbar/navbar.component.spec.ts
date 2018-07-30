import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HomeModule } from '../home/home.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { BotConfigModule } from '../bot-config/bot-config.module';
import { BotManagementModule } from '../bot-management/bot-management.module';
import { CallbackComponent } from '../callback/callback.component';
import { AuthService } from '../auth/auth.service';
import { LoadingComponent } from '../core/loading.component';
import { AuthGuard } from '../auth/auth.guard';
import { ROUTE_NAMES } from '../routes/routes.config';
import { HeroesComponent } from '../heroes/heroes.component';
import { SortablejsModule } from 'angular-sortablejs';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { ItemsComponent } from '../items/items.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let router: Router;
    let location: Location;
    let auth: AuthService;
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CallbackComponent,
                LoadingComponent,
                HeroesComponent,
                ItemsComponent,
                FilterPipe,
            ],
            imports: [
                RouterTestingModule.withRoutes(ROUTES),
                HomeModule,
                DashboardModule,
                BotConfigModule,
                BotManagementModule,
                SortablejsModule,
                FormsModule,
            ],
            providers: [
                AuthService,
                AuthGuard,
                ApiConnectService,
                HttpHandler,
                HttpClient,
                Location,
            ],
        })
        .compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        auth = TestBed.get(AuthService);
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to Home from logo', fakeAsync(() => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('.navbar-brand')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual(ROUTE_NAMES.HOME);
        });
    }));

    it('should redirect to Dashboard from dashboard link, if logged in', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('a#dashboardLink')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual(ROUTE_NAMES.DASHBOARD);
            });
        }
    }));

    it('should redirect to Manage page from manage link, if logged in', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('a#manageLink')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual(ROUTE_NAMES.BOT_MANAGEMENT);
            });
        }
    }));

    it('should show log in buttons if not logged in', () => {
        auth.setLoggedIn(false);
        fixture.detectChanges();
        if (!auth.loggedIn) {
            const logInButton = fixture.debugElement
                .query(By.css('button#logInButton')).nativeElement.innerHTML;
            expect(logInButton).toContain('SIGN IN');
        }
    });

    it('should redirect to home on logout', () => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('#logoutButton')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual(ROUTE_NAMES.HOME);
                expect(auth.loggedIn).toEqual(false);
            });
        }
    });
});
