import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationFormat, Condition, Trigger, Operator } from '../ConfigurationFormat';
import { ApiConnectService } from '../services/api-connect.service';
import * as globalConfig from '../../../config/config.json';

// Jquery imports
declare var $: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';

    // default condition
    condition: Condition = {
        trigger: Trigger.Time,
        operator: Operator.LessThan,
        conditional: 0,
        action: 0
    };

    // configuration object
    config: ConfigurationFormat = {
        name: 'test',
        description: 'test',
        push: {
            top: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
            mid: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
            bot: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
        },
        farm: {
            top: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
            mid: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
            bot: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }]
        },
        defend: {
            top: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
            mid: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }],
            bot: [{ 
                trigger: Trigger.Time,
                operator: Operator.LessThan,
                conditional: 0,
                action: 0 
            }]
        },
        roam: [{ 
            trigger: Trigger.Time,
            operator: Operator.LessThan,
            conditional: 0,
            action: 0 
        }],
        roshan: [{ 
            trigger: Trigger.Time,
            operator: Operator.LessThan,
            conditional: 0,
            action: 0 
        }]
    };
    generateURL = "";

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    save() {
        if (this.validateInfo()) {
            // call generate from api service
            const response = this.api.generate(this.config).subscribe((data) => {
                this.generateURL = globalConfig['app']['API_URL'] + '/download/' + data.id;
            });
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
