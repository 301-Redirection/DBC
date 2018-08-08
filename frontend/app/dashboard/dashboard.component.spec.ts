import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, By } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { authServiceStub } from '../testing/authServiceStub';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let routerLinks: any;
    let linkDebugElements: any;
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

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', [
            'recentBots',
            'removeBot',
        ]);
        apiConnectServiceStub.recentBots.and
            .returnValue(Observable.of(testBots));

        apiConnectServiceStub.removeBot.and
            .returnValue(Observable.of('Hey, it got deleted'));

        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                RouterLinkDirectiveStub,
            ],
            providers: [
                { provide: AuthService, useValue: authServiceStub },
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        linkDebugElements = fixture.debugElement
            .queryAll(By.directive(RouterLinkDirectiveStub));

        routerLinks = linkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(routerLinks.length).toBe(7, 'should have 7 routerLinks');
        expect(routerLinks[0].linkParams).toBe('/bot-config');
        expect(routerLinks[1].linkParams).toBe('/bot-config/1');
        expect(routerLinks[2].linkParams).toBe('/bot-config/2');
        expect(routerLinks[3].linkParams).toBe('/bot-config/3');
        expect(routerLinks[4].linkParams).toBe('/bot-config/4');
        expect(routerLinks[5].linkParams).toBe('/bot-config/5');
        expect(routerLinks[6].linkParams).toBe('/bot-management');
    });

    it('should have the title \'Dota 2 Bot Scripting - Dashboard\'', () => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Dashboard');
    });

    it('should redirect to Configuration page on \'New Bot Configuration\' click', fakeAsync(() => {
        const botConfigLinkDebugElement = linkDebugElements[0];   // heroes link DebugElement
        const botConfigLink = routerLinks[0]; // heroes link directive

        expect(botConfigLink.navigatedTo).toBeNull('should not have navigated yet');

        botConfigLinkDebugElement.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(botConfigLink.navigatedTo).toBe('/bot-config');
    }));

    it('should redirect to Manage page on \'View more bots\' click', fakeAsync(() => {
        const botManagementLinkDebug = linkDebugElements[6];   // heroes link DebugElement
        const botManagementLink = routerLinks[6]; // heroes link directive

        expect(botManagementLink.navigatedTo).toBeNull('should not have navigated yet');

        botManagementLinkDebug.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(botManagementLink.navigatedTo).toBe('/bot-management');
    }));

    // TODO: add more tests to do with how many bots are shown,
    // and if they're the right tests
});
