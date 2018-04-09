import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { Title } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { DashboardModule } from './dashboard.module';
import { BotConfigModule } from '../bot-config/bot-config.module';
import { BotManagementModule } from '../bot-management/bot-management.module';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ DashboardComponent ],
        imports: [        
            NavbarModule,
            RouterTestingModule.withRoutes(ROUTES),
            HomeModule,            
            BotConfigModule,
            BotManagementModule 
        ],
        providers: [
            ApiConnectService,
            HttpClient,
            HttpHandler,
            Location,
            { provide: Title, useClass: Title }
        ]
        })
        .compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
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

    it(`should have the title 'Dota 2 Bot Scripting - Dashboard'`, async(() => {        
        let title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Dashboard');
    }));

    it('should redirect to Configuration page on \'New Bot Configuration\' click', fakeAsync(() => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#new-bot-config-button')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/bot-config');            
        });
    }));

    it('should redirect to Manage page on \'View more bots\' click', fakeAsync(() => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#view-more-bots-link')).nativeElement.click();
        fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/bot-management');            
        });
    }));
});
