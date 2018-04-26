import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationFormat } from '../ConfigurationFormat';
import { ApiConnectService } from '../services/api-connect.service';
import * as globalConfig from '../../../config/config.js';

// Jquery imports
// let $: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';

    // configuration object
    bot: ConfigurationFormat = {
        id: -1,
        name: 'test',
        description: 'test',
        configuration: {
            push: {
                top: 0,
                mid: 0,
                bot: 0,
            },
            farm: {
                top: 0,
                mid: 0,
                bot: 0,
            },
            defend: {
                top: 0,
                mid: 0,
                bot: 0,
            },
            roam: 0,
            roshan: 0,
        },
    };
    generateURL = '';

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    save() {
        if (this.validateInfo()) {
            // call generate from api service
            // const response = this.api.generate(this.config).subscribe((data) => {
            //     this.generateURL = `${globalConfig['app']['API_URL']}/download/${data.id}`;
            // });

            const response = this.api.updateBot(this.bot).subscribe((data) => {
                alert('successfully got the bot');
            });
        }
    }

    validateInfo(): boolean {
        if (this.bot.name === '' || this.bot.description === '') {
            alert('Please enter your bot script name and description');
            return false;
        }
        return true;
    }
}
