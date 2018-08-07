import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { authServiceStub } from '../testing/authServiceStub';
import { SortablejsModule } from 'angular-sortablejs';
import { FormsModule } from '@angular/forms';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';

const compileComponents = () => {
    TestBed.configureTestingModule({
        declarations: [
            NavbarComponent,
            RouterLinkDirectiveStub,
        ],
        imports: [
            SortablejsModule,
            FormsModule,
        ],
        providers: [
            { provide: AuthService, useValue: authServiceStub },
        ],
    })
    .compileComponents();
};

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let auth;
    let routerLinks: any;
    let linkDes: any;
    beforeAll(() => {
        auth = authServiceStub;
    });
    describe('Logged out tests', () => {
        beforeEach((done) => {
            auth.setLoggedIn(false);
            compileComponents();
            fixture = TestBed.createComponent(NavbarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            linkDes = fixture.debugElement
                .queryAll(By.directive(RouterLinkDirectiveStub));

            routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
            done();
        });

        it('should create', (done) => {
            expect(component).toBeTruthy();
            done();
        });

        it('should show log in buttons', (done) => {
            const logInButton = fixture.debugElement
                .query(By.css('button#logInButton')).nativeElement.innerHTML;
            expect(logInButton).toContain('SIGN IN');
            done();
        });
    });

    describe('Logged in tests', () => {
        beforeEach((done) => {
            auth.setLoggedIn(true);
            compileComponents();
            fixture = TestBed.createComponent(NavbarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            linkDes = fixture.debugElement
                .queryAll(By.directive(RouterLinkDirectiveStub));

            routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
            done();
        });

        it('Links should go to logged in places', (done) => {
            expect(routerLinks.length).toBe(7, 'should have 7 routerLinks');
            expect(routerLinks[0].linkParams).toBe('/home');
            expect(routerLinks[1].linkParams).toBe('/dashboard');
            expect(routerLinks[2].linkParams).toBe('/bot-management');
            expect(routerLinks[3].linkParams).toBe('/heroes');
            expect(routerLinks[4].linkParams).toBe('/abilities');
            expect(routerLinks[5].linkParams).toBe('/items');
            expect(routerLinks[6].linkParams).toBe('/desires');
            done();
        });
    });
});
