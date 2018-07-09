import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotManagementComponent } from './bot-management.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

describe('BotManagementComponent', () => {
    let component: BotManagementComponent;
    let fixture: ComponentFixture<BotManagementComponent>;

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

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', ['recentBots']);
        const getQuoteSpy = apiConnectServiceStub.recentBots.and
            .returnValue(Observable.of(testBots));
        TestBed.configureTestingModule({
            declarations: [BotManagementComponent],
            imports: [
                NavbarModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                HttpClient,
                HttpHandler,
                { provide: Title, useClass: Title },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BotManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the title \'Dota 2 Bot Scripting - Management\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Management');
    }));
});
