import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationFormat } from '../ConfigurationFormat';
import { ApiConnectService } from '../services/api-connect.service';
//var Config = require('./somefile.json');
import * as app from '../../../config/config.json';
// Jquery imports
declare var $: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';

    // configuration object
    config: ConfigurationFormat = {
        name: 'test',
        description: 'test',
        push: {
            top: 0,
            mid: 0,
            bot: 0
        },
        farm: {
            top: 0,
            mid: 0,
            bot: 0
        },
        defend: {
            top: 0,
            mid: 0,
            bot: 0
        },
        roam: 0,
        roshan: 0,
    };
    generateURL = String(app['API_URL']) + '/generate';

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    save() {
        if (this.validateInfo()) {
            // call generate from api service
            const response = this.api.generate(this.config).subscribe((data) => {
                this.generateURL = app['API_URL'] + '/download/' + data.id;
                console.log(this);
            });
        }
    }

    validateInfo(): boolean {
        if (this.config.name === '' || this.config.description === '') {
            alert('Please enter your bot script name and description');
            return false;
        }
        return true;
    }
}
