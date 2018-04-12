import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
    config = {
        name: '',
        description: '',
        pushTop: 0,
        pushMiddle: 0,
        pushBottom: 0,
        defendTop: 0,
        defendMiddle: 0,
        defendBottom: 0,
        farmTop: 0,
        farmMiddle: 0,
        farmBottom: 0,
        roam: 0,
        roshan: 0
    };

    constructor(private title: Title) {
        this.title.setTitle(this.pageTitle);        
    }

    ngOnInit() {
    }

    generate() {
        if (this.validateInfo()) {
            console.log(this.config);
            // call generate from api service
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
