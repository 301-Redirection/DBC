import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { authServiceStub } from '../testing/auth-service-stub';
import { FormsModule } from '@angular/forms';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';

const compileComponents = () => {
    TestBed.configureTestingModule({
        declarations: [
            NavbarComponent,
            RouterLinkDirectiveStub,
        ],
        imports: [
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
    let linkDebugElements: any;
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

            linkDebugElements = fixture.debugElement
                .queryAll(By.directive(RouterLinkDirectiveStub));

            routerLinks = linkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
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

            linkDebugElements = fixture.debugElement
                .queryAll(By.directive(RouterLinkDirectiveStub));

            routerLinks = linkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
            done();
        });

        it('Links should go to logged in places', (done) => {
            expect(routerLinks.length).toBe(4, 'should have 7 routerLinks');
            expect(routerLinks[0].linkParams).toBe('/home');
            expect(routerLinks[1].linkParams).toBe('/dashboard');
            expect(routerLinks[2].linkParams).toBe('/bot-config');
            expect(routerLinks[3].linkParams).toBe('/bot-management');
            done();
        });
    });
});
