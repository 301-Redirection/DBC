import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiConnectService } from '../services/api-connect.service';
import * as globalConfig from '../../../config/config.js';
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
    numberOfBots: number;
    pageTitle = 'Dota 2 Bot Scripting - Dashboard';
    isRetrieving: boolean;
    viewMoreEnabled: boolean;

    constructor(private t: Title, private api: ApiConnectService) {
        this.t.setTitle(this.pageTitle);
    }

    ngOnInit() {
        $('#deleteConfirmation').modal('hide');
        this.getUserBotScripts();
        this.isRetrieving = true;
        this.viewMoreEnabled = false;
    }

    processBotData(data) {
        this.bots = [];
        this.isRetrieving = true;
        let tempBots = [];
        tempBots = data.botConfigs;
        this.numberOfBots = tempBots.length;

        let botDisplayLimit;
        if (this.viewMoreEnabled) {
            botDisplayLimit = tempBots.length;
        } else {
            botDisplayLimit = (tempBots.length < 5) ? tempBots.length : 5;
        }

        for (let i = 0 ; i < botDisplayLimit ; i += 1) {
            const bot = tempBots[i];
            const date = moment(bot.updatedAt).format(DATE_FORMAT);
            bot.updatedAt = date;
            bot.generateURL =
                `${globalConfig['app']['API_URL']}/download/${bot.id}`;
            this.bots.push(bot);
        }
        this.isRetrieving = false;
    }

    getUserBotScripts () {
        this.api.getAllBots().subscribe(
            (data) => {
                this.processBotData(data);
            },
            () => { },
        );
    }

    viewMore () {
        this.viewMoreEnabled = true;
        this.getUserBotScripts();
    }

    deleteBotScript (botScriptID: number) {
        this.api.removeBot(botScriptID).subscribe(
            (data) => {
                this.removeScriptFromBots(botScriptID);
                console.log(data);
            },
            (error) => {
                console.log(error);
            },
        );
    }

    removeScriptFromBots(botScriptID) {
        let index = -1;
        let found = false;
        for (let i = 0 ; i < this.bots.length && !found ; i += 1) {
            if (this.bots[i]['id'] === botScriptID) {
                found = true;
                index = i;
            }
        }

        if (index !== -1) {
            this.bots.splice(index, 1);
        }

        this.numberOfBots -= 1;
    }

    showDeleteModal(id) {
        $('#deleteConfirmation').modal('show');
        this.botID = id;
    }

    sortBotScripts(value) {
        if (value === 1) {
            this.bots.sort((a, b) => a.updatedAt > b.updatedAt);
        } else {
            this.bots.sort((a, b) => a.updatedAt < b.updatedAt);
        }
        return this.bots;
    }

}
