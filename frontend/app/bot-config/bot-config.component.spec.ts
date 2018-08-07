import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BotConfigComponent } from './bot-config.component';
import { FormsModule } from '@angular/forms';
import { ApiConnectService } from '../services/api-connect.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

describe('BotConfigComponent', () => {
    let component: BotConfigComponent;
    let fixture: ComponentFixture<BotConfigComponent>;

    beforeEach(async(() => {

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', [
            'getSpecificBot',
            'updateBot',
        ]);

        const specificBot = {
            botConfig: [
                {
                    configuration: JSON.stringify({
                        teamDesires: {
                            defend: {
                                top: 0.5,
                                mid: 0.2,
                                bot: 0.8,
                            },
                            push: {
                                top: 0.9,
                                mid: 0.8,
                                bot: 0.4,
                            },
                            roam: 0.6,
                            roshan: 0.5,
                        },
                    }),
                    createdAt: '2018-07-30T21:59:59.000Z',
                    description: 'This bot was seeded into the database',
                    id: 1,
                    name: 'Test real 1',
                    updatedAt: '2018-07-30T21:59:59.000Z',
                    userId: 'auth0|5aaad1a6aa9ad130c17479ba',
                },
            ],
        };

        const botId = {};

        const getSpecificBotSpy = apiConnectServiceStub.getSpecificBot.and
            .returnValue(Observable.of(specificBot));

        const updateBotSpy = apiConnectServiceStub.updateBot.and
            .returnValue(Observable.of(botId));

        TestBed.configureTestingModule({
            declarations: [BotConfigComponent],
            imports: [
                RouterTestingModule,
                FormsModule,
            ],
            providers: [
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                { provide: Title, useClass: Title },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BotConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the title \'Dota 2 Bot Scripting - Configuration\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Configuration');
    }));
});
