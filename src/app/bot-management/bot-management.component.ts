import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BOTS } from '../bot-testing-data';
import { forEach } from '@angular/router/src/utils/collection';
import { ApiConnectService } from '../services/api-connect.service';

@Component({
    selector: 'app-bot-management',
    templateUrl: './bot-management.component.html',
    styleUrls: ['./bot-management.component.scss'],
})
export class BotManagementComponent implements OnInit {
    bots: any;
    showDetails = false;
    pageTitle = 'Dota 2 Bot Scripting - Management';

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() {
        this.getUserBotScripts();
    }

    getUserBotScripts () {
        const response = this.api.recentBots().subscribe((data) => {
            this.bots = data.botConfigs;
        });
    }
}
