import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConnectService } from '../services/api-connect.service';
import { FormsModule, ReactiveFormsModule , FormGroup } from '@angular/forms';
import * as moment from 'moment';

// Import JQuery
declare var $: any;
const DATE_FORMAT = 'DD/MM/YYYY [at] HH:mm';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    bots: any;
    botID: number;
    pageTitle = 'Dota 2 Bot Scripting - Dashboard';

    constructor(private t: Title, private api: ApiConnectService) {
        this.t.setTitle(this.pageTitle);
    }

    ngOnInit() {
        $('#deleteConfirmation').modal('hide');
        this.getUserBotScripts();
    }

    getUserBotScripts () {
        this.api.recentBots().subscribe(
            (data) => {
                this.bots = data.botConfigs;
                for (const i in this.bots) {
                    const bot = this.bots[i];
                    const date = moment(bot.updatedAt).format(DATE_FORMAT);
                    bot.updatedAt = date;
                }
            },
            () => { },
        );
    }

    viewMore () {
        this.api.getAllBots().subscribe(
            (data) => {
                this.bots = data.botConfigs;
                for (const i in this.bots) {
                    const bot = this.bots[i];
                    const date = moment(bot.updatedAt).format(DATE_FORMAT);
                    bot.updatedAt = date;
                }
            },
            () => { },
        );
    }

    deleteBotScript (botScriptID: number) {
        this.api.removeBot(botScriptID).subscribe(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
            },
        );
        this.getUserBotScripts();
        this.botID = -1;
    }

    showDeleteModal(id) {
        $('#deleteConfirmation').modal('show');
        this.botID = id;
    }

    sortBotScripts(value) {
        if (value === 1) {
            this.bots.sort((a, b) => a.updatedAt < b.updatedAt);
        } else {
            this.bots.sort((a, b) => a.updatedAt < b.updatedAt);
        }
        return this.bots;
    }

}
