import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule } from '../routes/routes.module';
import { Location } from '@angular/common';
import { inject } from '@angular/core/src/render3';
import { By } from '@angular/platform-browser';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BotConfigComponent } from '../bot-config/bot-config.component';
import { BotManagementComponent } from '../bot-management/bot-management.component';
import { HomeModule } from '../home/home.module';
import { NavbarModule } from './navbar.module';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ 
            NavbarComponent            
        ],
        imports: [
            RouterTestingModule,
            HomeModule            
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        router.initialNavigation();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to Home on logo click', fakeAsync(() => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('.navbar-brand')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual('');
            console.log('after expect: ' + location.path());
        });
    }));

    it('should redirect to Dashboard on dashboard link click', fakeAsync(() => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#dashboard-link')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/dashboard');
            console.log('after expect: ' + location.path());
        });
    }));
});
