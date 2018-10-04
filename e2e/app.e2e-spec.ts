import { AppPage } from './app.po';

describe('Dota Bot Script Interface - Home Page', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display the correct title about the site on the home page', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('DOTA 2 Bots - Your way');
    });
});
