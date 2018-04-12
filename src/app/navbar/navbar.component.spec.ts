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
import { LOADIPHLPAPI } from 'dns';
import { LoadingComponent } from '../core/loading.component';
import { AuthGuard } from '../auth/auth.gaurd';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let router: Router;
    let location: Location;
    let auth: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            CallbackComponent,
            LoadingComponent
        ],
        imports: [
            RouterTestingModule.withRoutes(ROUTES),
            HomeModule,
            DashboardModule,
            BotConfigModule,
            BotManagementModule  
        ],
        providers: [ 
            AuthService,
            AuthGuard,
            ApiConnectService,
            HttpHandler,
            HttpClient,
            Location          
        ]
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
            expect(location.path()).toEqual('/home');
        });
    }));

    it('should redirect to Dashboard from dashboard link, if logged in', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('a#dashboard-link')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/dashboard');
            });
        }
    }));

    it('should redirect to Configuration page from configuration link, if logged in', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('a#config-link')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/bot-config');
            });
        }
    }));

    it('should redirect to Manage page from manage link, if logged in', fakeAsync(() => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('a#manage-link')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/bot-management');
            });
        }
    }));

    it('should show log in and sign up buttons if not logged in', () => {
        auth.setLoggedIn(false);
        fixture.detectChanges();
        if (!auth.loggedIn) {
            var logInButton = fixture.debugElement.query(By.css('button#logInButton')).nativeElement.innerHTML;
            expect(logInButton).toContain('LOG IN');
        }
    });

    it('should redirect to home on logout', () => {
        auth.setLoggedIn(true);
        fixture.detectChanges();
        if (auth.loggedIn) {
            fixture.debugElement.query(By.css('#logoutButton')).nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/home');
                expect(auth.loggedIn).toEqual(false);
            });
        }
    });
});
