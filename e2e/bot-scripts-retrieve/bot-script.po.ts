import { browser, by, element } from 'protractor';

export class BotScriptPage {
    navigateTo() {
        return browser.get('/dashboard');
    }

    getPageTitle() {
        return element(by.css('app-root h1')).getText();
    }

    getFirstBotScriptTitle() {
        return element(by.css('div.col-sm-9 h5')).getText();
    }
}
