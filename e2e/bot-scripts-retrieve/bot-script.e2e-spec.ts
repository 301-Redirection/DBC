import { BotScriptPage } from './bot-script.po';
import { AuthService } from '../../frontend/app/auth/auth.service';

describe('Saving and retrieving bot scripts from the DB', () => {
    let page: BotScriptPage;
    auth: AuthService;

    beforeEach(() => {
        page = new BotScriptPage();
        this.auth.setLoggedIn(true);
    });

    it('Should display the correct page title', () => {
        page.navigateTo();
        expect(page.getPageTitle()).toEqual('Dashboard');
    });

    it('should display at least one bot script', () => {
        expect(page.getFirstBotScriptTitle()).toEqual('Test Bot Script');
    });
});
