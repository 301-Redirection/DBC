import { Component, OnInit } from '@angular/core';
import { BOTS } from '../bot-testing-data';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../routes/routes.config';
import { ApiConnectService } from '../services/api-connect.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    bots: any;
    pageTitle = 'Dota 2 Bot Scripting - Dashboard';

    constructor(private title: Title, private api: ApiConnectService, private router: Router) {
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

    deleteBotScript (botScriptID: number) {
        console.log('Delete this bot: ' + botScriptID);
    }
}
