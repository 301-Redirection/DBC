import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BOTS } from '../bot-testing-data';
import { forEach } from '@angular/router/src/utils/collection';
import { ApiConnectService } from '../services/api-connect.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_NAMES } from '../routes/routes.config';

declare var $: any;
@Component({
    selector: 'app-bot-management',
    templateUrl: './bot-management.component.html',
    styleUrls: ['./bot-management.component.scss'],
})
export class BotManagementComponent implements OnInit {
    bots: any;
    botID: number;
    showDetails = false;
    pageTitle = 'Dota 2 Bot Scripting - Management';

    constructor(private title: Title, private api: ApiConnectService, private router: Router) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() {
        $('#deleteConfirmation').modal('hide');
        this.getUserBotScripts();
    }

    getUserBotScripts () {
        const response = this.api.recentBots().subscribe((data) => {
            this.bots = data.botConfigs;
        });
    }

    deleteBotScript (botScriptID: number) {
        console.log('Delete this bot: ' + botScriptID);
        const response = this.api.removeBot(botScriptID).subscribe((data) => {
            console.log(data);
        });
        this.getUserBotScripts();
        this.botID = -1;
        $('#deleteConfirmation').modal('hide');
    }

    showDeleteModal(id) {
        $('#deleteConfirmation').modal('show');
        this.botID = id;
    }
}
