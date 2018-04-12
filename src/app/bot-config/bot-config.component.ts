import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationFormat } from '../configFormat';
import { ApiConnectService } from '../services/api-connect.service';

// Jquery imports
declare var $: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss']
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
        roshan: 0
    };

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);        
    }

    ngOnInit() {
    }

    generate() {
        if (this.validateInfo()) {
            console.log(this.config);
            // call generate from api service
            this.api.generate(this.config).subscribe();
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
