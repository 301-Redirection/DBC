import { AppPage } from './app.po';

describe('prototype App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });

    describe('Navigation:', () => {
        describe('from home page', () => {
            beforeEach(() => {
                browser.get('/');
            });
            it('should redirect to Dashboard from dashboard link', (done) => {
                fixture.debugElement.query(By.css('a#dashboardLink')).nativeElement.click();
                fixture.whenStable().then(() => {
                    expect(location.path()).toEqual(ROUTE_NAMES.DASHBOARD);
                    done();
                });
            });

            it('should redirect to Manage page from manage link', (done) => {
                fixture.debugElement.query(By.css('a#manageLink')).nativeElement.click();
                fixture.whenStable().then(() => {
                    expect(location.path()).toEqual(ROUTE_NAMES.BOT_MANAGEMENT);
                    done();
                });
            });

            it('should redirect to home on logout', (done) => {
                fixture.debugElement.query(By.css('#logoutButton')).nativeElement.click();
                fixture.whenStable().then(() => {
                    expect(location.path()).toEqual(ROUTE_NAMES.HOME);
                    expect(auth.loggedIn).toEqual(false);
                    done();
                });
            });

            it('should redirect to Home from logo', (done) => {
                fixture.detectChanges();
                fixture.debugElement.query(By.css('.navbar-brand')).nativeElement.click();
                fixture.whenStable().then(() => {
                    expect(location.path()).toEqual(ROUTE_NAMES.HOME);
                    done();
                });
            });
        });
    });
});
