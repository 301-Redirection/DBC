import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiConnectService } from '../services/api-connect.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, By } from '@angular/platform-browser';
import { AbilitiesModule } from '../bot-config/abilities/abilities.module';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                NavbarModule,
                RouterTestingModule,
                AbilitiesModule,
            ],
            providers: [
                ApiConnectService,
                HttpClient,
                HttpHandler,
                { provide: Title, useClass: Title },
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the title \'Dota 2 Bot Scripting - Home\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Home');
    }));

    it('should render title in a h1 tag', async(() => {
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement
            .query(By.css('#createBotsTitle')).nativeElement.innerHTML;

        expect(compiled).toEqual('Create Your Own Bots!');
    }));
});
