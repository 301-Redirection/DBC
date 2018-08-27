import {
    Component,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiConnectService } from '../services/api-connect.service';
import { ActivatedRoute } from '@angular/router';
import * as globalConfig from '../../../config/config.js';

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit, AfterViewInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';

    // Bot variables
    name: string = '';
    description: string = '';
    id: number = -1;

    generateURL = '';

    constructor
    (
        private title: Title,
        private api: ApiConnectService,
        private route: ActivatedRoute,
    ) {
        this.title.setTitle(this.pageTitle);
        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap['params']['botScriptID']) {
                this.loadBotScript(paramMap['params']['botScriptID']);
            }
        });
    }

    ngOnInit() { }

    ngAfterViewInit() {}

    save() {
        if (this.validateInfo()) {
            // call update bot from api service
            const requestBot = {
                id: this.id,
                name: this.name,
                description: this.description,
                configuration: { test: 'true' },
            };
            this.api.updateBot(requestBot).subscribe(
                (data) => {
                    this.generateURL =
                        `${globalConfig['app']['API_URL']}/download/${data.botConfig.id}`;
                },
                (error) => {
                    console.log(error);
                },
            );
        }
    }

    validateInfo(): boolean {
        if (this.name === '' || this.description === '') {
            alert('Please enter your bot script name and description');
            return false;
        }
        return true;
    }

    reset () {
        location.reload();
    }

    loadBotScript(id) {
        let res: any;
        this.api.getSpecificBot(id).subscribe(
            (data) => {
                res = data['botConfig'];
                res = res[0];
                if (res != null) {
                    this.id = res.id;
                    this.name = res.name;
                    // this.configuration = JSON.parse(res.configuration);
                    this.description = res.description;
                }
            },
            (error) => {
                console.log(error);
            },
        );
    }
}
