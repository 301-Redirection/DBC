import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Title, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BotConfigComponent } from './bot-config.component';
import { ApiConnectService } from '../services/api-connect.service';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { BotConfigDataService } from '../services/bot-config-data.service';

@Component({ selector: 'app-team-desires', template: '' })
class TeamDesiresComponent {reset() { }}

@Component({ selector: 'app-heroes', template: '' })
class HeroesComponent {
    reset() { }
    @Input('selected') selected: string;
}

@Component({ selector: 'app-abilities', template: '' })
class AbilitiesComponent {reset() { }}

@Component({ selector: 'app-items', template: '' })
class ItemsComponent {
    reset() { }
    @Input('selected') selected: string;
}

describe('BotConfigComponent', () => {
    let component: BotConfigComponent;
    let fixture: ComponentFixture<BotConfigComponent>;
    let activatedRoute: ActivatedRouteStub;
    beforeEach(async(() => {
        this.teamDesiresComponent = jasmine.createSpyObj('TeamDesiresComponent', ['reset']);
        this.heroesComponent = jasmine.createSpyObj('HeroesComponent', ['reset']);
        this.abilitiesComponent = jasmine.createSpyObj('AbilitiesComponent', ['reset']);
        this.itemsComponent = jasmine.createSpyObj('ItemsComponent', ['reset']);

        const apiConnectServiceStub = jasmine.createSpyObj('ApiConnectService', [
            'getSpecificBot',
            'updateBot',
        ]);
        activatedRoute = new ActivatedRouteStub({});
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

        apiConnectServiceStub.getSpecificBot.and
            .returnValue(Observable.of(specificBot));

        apiConnectServiceStub.updateBot.and
            .returnValue(Observable.of(botId));

        TestBed.configureTestingModule({
            declarations: [
                BotConfigComponent,
                TeamDesiresComponent,
                HeroesComponent,
                AbilitiesComponent,
                ItemsComponent,
            ],
            imports: [
                FormsModule,
            ],
            providers: [
                { provide: ApiConnectService, useValue: apiConnectServiceStub },
                { provide: ActivatedRoute, useValue: activatedRoute },
                {
                    provide: Router,
                    useClass: class { navigate = jasmine.createSpy('navigate'); },
                },
                BotConfigDataService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BotConfigComponent);
        component = fixture.componentInstance;
        component.teamDesiresComponent = this.teamDesiresComponent;
        component.abilitiesComponent = this.abilitiesComponent;
        component.itemsComponent = this.itemsComponent;
        component.heroesComponent = this.heroesComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the title \'Dota 2 Bot Scripting - Configuration\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Configuration');
    }));

    it('should change the title of the bot script', () => {
        const inputName = fixture.debugElement.query(By.css('#inputName')).nativeElement;

        inputName.value = 'Push Bot Script';
        inputName.dispatchEvent(new Event('input'));

        expect(inputName.value).toEqual(component.name);
    });

    it('should fail the validate info test', () => {
        const validateResult = component.validateInfo();
        expect(validateResult).toBeFalsy();
    });

    it('should change the description of the bot script', () => {
        const inputDescription = fixture.debugElement.query(
            By.css('#inputDescription')).nativeElement;

        inputDescription.value = 'This is a bot script testing the pushing potential';
        inputDescription.dispatchEvent(new Event('input'));

        expect(inputDescription.value).toEqual(component.description);
    });

    it('should pass the validate info test', () => {
        component.name = 'Test Bots';
        component.description = 'Description of bots';
        const validateResult = component.validateInfo();
        expect(validateResult).toBeTruthy();
    });

    it('should reset the fields to null', () => {
        component.name = 'Test Bots';
        component.description = 'Description of bots';

        component.reset();

        expect(component.name).toEqual('');
        expect(component.description).toEqual('');
    });

    it('should navigate to team desires configuration and update the selected tab property', () => {
        const navTab = fixture.debugElement.query(By.css('#nav-desires-tab')).nativeElement;
        navTab.click();

        expect(component.selectedTab).toEqual('teamDesires');
    });
});
