import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { 
    ConfigurationFormat, 
    Condition, 
    Trigger, 
    Operator, 
    Action, 
    LogicalOperator, 
} from '../ConfigurationFormat';
import { ConfigurationClass } from './configuration-class';
import { ApiConnectService } from '../services/api-connect.service';
import * as globalConfig from '../../../config/config.json';


@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';

    // Bot variables
    name: string = 'test';
    description: string = 'test';

    // configuration object
    config: ConfigurationFormat = {
        push: {
            top: new ConfigurationClass(),
            mid: new ConfigurationClass(),
            bot: new ConfigurationClass(),
        },
        farm: {
            top: new ConfigurationClass(),
            mid: new ConfigurationClass(),
            bot: new ConfigurationClass(),
        },
        defend: {
            top: new ConfigurationClass(),
            mid: new ConfigurationClass(),
            bot: new ConfigurationClass(),
        },
        roam: new ConfigurationClass(),
        roshan: new ConfigurationClass(),
    };

    generateURL = '';

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    save() {
        if (this.validateInfo()) {
            const requestObject = {
                config: this.config,
                name: this.name,
                description: this.description,
            };                   

            // call generate from api service
            const response = this.api.generate(requestObject).subscribe((data) => {
                this.generateURL = `${globalConfig['app']['API_URL']}/download/${data.id}`;
            });
        }
    }

    validateInfo(): boolean {
        if (this.name === '' || this.description === '') {
            alert('Please enter your bot script name and description');
            return false;
        }
        return true;
    }
}
