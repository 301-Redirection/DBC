import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ApiConnectService } from '../services/api-connect.service';
import { Title, By } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { authServiceStub } from '../testing/auth-service-stub';
import { LoadingModule } from '../core/loading.module';

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
        const recentBots = {
            botConfigs: testBots.botConfigs.slice(0, 5),
        };

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', [
            'recentBots',
            'removeBot',
            'getAllBots',
        ]);
        apiConnectServiceStub.recentBots.and
            .returnValue(Observable.of(recentBots));

        apiConnectServiceStub.getAllBots.and
            .returnValue(Observable.of(testBots));

        apiConnectServiceStub.removeBot.and
            .returnValue(Observable.of('Hey, it got deleted'));

        TestBed.configureTestingModule({
            imports: [
                LoadingModule,
            ],
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
        expect(routerLinks.length).toBe(6, 'should have 6 routerLinks');
        expect(routerLinks[0].linkParams).toBe('/bot-config');
        expect(routerLinks[1].linkParams).toBe('/bot-config/1');
        expect(routerLinks[2].linkParams).toBe('/bot-config/2');
        expect(routerLinks[3].linkParams).toBe('/bot-config/3');
        expect(routerLinks[4].linkParams).toBe('/bot-config/4');
        expect(routerLinks[5].linkParams).toBe('/bot-config/5');
    });

    it('should have the title \'Dota 2 Bot Configurator - Dashboard\'', () => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Configurator - Dashboard');
    });

    // TODO: add more tests to do with how many bots are shown,
    // and if they're the right tests
});
