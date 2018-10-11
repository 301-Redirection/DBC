import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Title, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import { authServiceStub } from '../testing/auth-service-stub';
// import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                { provide: AuthService, useValue: authServiceStub },
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

    it('should have the title \'Dota 2 Bot Configurator - Home\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Configurator - Home');
    }));

    it('should render title in a h1 tag', async(() => {
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement
            .query(By.css('#createBotsTitle')).nativeElement.textContent;

        expect(compiled).toEqual('Create DOTA 2 Bots Your Way');
    }));

});
