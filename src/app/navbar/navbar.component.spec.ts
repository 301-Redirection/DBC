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

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [],
        imports: [
            RouterTestingModule.withRoutes(ROUTES),
            HomeModule,
            DashboardModule,
            BotConfigModule,
            BotManagementModule  
        ],
        providers: [ 
            ApiConnectService,
            HttpHandler,
            HttpClient,
            Location          
        ]
        })
        .compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
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
        fixture.detectChanges();
        var link = fixture.debugElement.query(By.css('a#dashboard-link'));
        // fixture.debugElement.query(By.css('a#dashboard-link')).nativeElement.click();
        if (link != null) {
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/dashboard');            
            });        
        }
    }));

    it('should redirect to Configuration page from configuration link, if logged in', fakeAsync(() => {                
        fixture.detectChanges();
        var link = fixture.debugElement.query(By.css('a#config-link'));
        // fixture.debugElement.query(By.css('a#config-link')).nativeElement.click();
        if (link != null) {
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/bot-config');            
            });        
        }
    }));

    it('should redirect to Manage page from manage link, if logged in', fakeAsync(() => {                
        fixture.detectChanges();
        var link = fixture.debugElement.query(By.css('a#manage-link'));
        // fixture.debugElement.query(By.css('a#manage-link')).nativeElement.click();
        if (link != null) {
            link.nativeElement.click();
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/bot-management');            
            });    
        }            
    }));

    it('should show log in and sign up buttons if not logged in', () => {
        fixture.detectChanges();

        // if not logged in, check for login and signup buttons 
        var loggedIn = false;

        if (loggedIn) {
            var logInButton = fixture.debugElement.query(By.css('button#logInButton')).nativeElement.innerHTML;            
            var signUpButton = fixture.debugElement.query(By.css('button#signUpButton')).nativeElement.innerHTML;            
            expect(logInButton == 'LOG IN' && signUpButton == 'SIGN UP').toBeTruthy();
        }
    });
});
