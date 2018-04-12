import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiConnectService } from '../services/api-connect.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                NavbarModule,
                RouterTestingModule
            ],
            providers: [
                ApiConnectService,
                HttpClient,
                HttpHandler,
                { provide: Title, useClass: Title }
            ]
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

    it(`should have the title 'Dota 2 Bot Scripting - Home'`, async(() => {
        let title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Home');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Create Your Own Bots!');
    }));

});
