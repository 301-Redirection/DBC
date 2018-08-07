import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
// import { ROUTE_NAMES } from '../routes/routes.config';
import { ApiConnectService } from '../services/api-connect.service';
import { FormsModule, ReactiveFormsModule , FormGroup } from '@angular/forms';
import * as moment from 'moment';

// Import JQuery
declare var $: any;
const DATE_FORMAT = 'DD/MM/YYYY [at] HH:mm';
@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
    bots: any;
    botID: number;
    pageTitle = 'Dota 2 Bot Scripting - Dashboard';
    dashboard = false;

    constructor(private t: Title, private api: ApiConnectService, private route: ActivatedRoute) {
        this.t.setTitle(this.pageTitle);
    }

    ngOnInit() {
        this.route.data.subscribe((argument) => {
            if (argument.dashboard && argument.dashboard === true) {
                this.dashboard = argument.dashboard;
            }
        });
        $('#deleteConfirmation').modal('hide');
        this.getUserBotScripts();
    }

    getUserBotScripts () {
        if (this.dashboard === true) {
            const response = this.api.recentBots().subscribe(
                (data) => {
                    this.bots = data.botConfigs;
                    for (const i in this.bots) {
                        const bot = this.bots[i];
                        const date = moment(bot.updatedAt).format(DATE_FORMAT);
                        bot.updatedAt = date;
                    }
                },
                (error) => {
                },
            );
        } else {
            const response = this.api.getAllBots().subscribe(
                (data) => {
                    this.bots = data.botConfigs;
                    for (const i in this.bots) {
                        const bot = this.bots[i];
                        const date = moment(bot.updatedAt).format(DATE_FORMAT);
                        bot.updatedAt = date;
                    }
                },
                (error) => {
                    console.log(error);
                },
            );
        }
    }

    deleteBotScript (botScriptID: number) {
        const response = this.api.removeBot(botScriptID).subscribe(
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

    swap(array, firstIndex, secondIndex) {
        const temp = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = temp;
    }

    compareDate(date, otherDate, int) {
        let bool;
        if (int >= 0) {
            bool = date > otherDate;
        } else {
            bool = date < otherDate;
        }
        return bool;
    }

    sortBotScripts(value) {
        console.log('called');
        const array = this.bots;
        for (let i = 0; i < array.length; i += 1) {
            for (let j = 1; j < array.length; j += 1) {
                if (this.compareDate(array[j - 1].updatedAt, array[j].updatedAt, value)) {
                    this.swap(array, j - 1, j);
                }
            }
        }
        return array;
    }

}
