import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationFormat } from '../ConfigurationFormat';
import { ApiConnectService } from '../services/api-connect.service';
import * as globalConfig from '../../../config/config.json';

// Jquery imports
// let $: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';
    imageURL = '../../assets/images/dota2-mini-map.png';
    prevImageURL = this.imageURL;
    fractionIcon = '';
    alertText = '';
    fractionDetails = '';
    fractionSelected = '';

    // configuration object
    config: ConfigurationFormat = {
        name: 'test',
        description: 'test',
        push: {
            top: 0,
            mid: 0,
            bot: 0,
        },
        farm: {
            top: 0,
            mid: 0,
            bot: 0,
        },
        defend: {
            top: 0,
            mid: 0,
            bot: 0,
        },
        roam: 0,
        roshan: 0,
    };
    generateURL = '';

    constructor(private title: Title, private api: ApiConnectService) {
        this.title.setTitle(this.pageTitle);
    }

    ngOnInit() { }

    save() {
        if (this.validateInfo()) {
            // call generate from api service
            const response = this.api.generate(this.config).subscribe((data) => {
                this.generateURL = `${globalConfig['app']['API_URL']}/download/${data.id}`;
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

    mouseOverEvent (event) {
        if (event === 'dire') {
            this.imageURL = '../../assets/images/dota2-mini-map-dire-hl.png';
        } else {
            this.imageURL = '../../assets/images/dota2-mini-map-radiant-hl.png';
        }
    }

    mouseLeaveEvent() {
        this.imageURL = this.prevImageURL;
    }

    clickEvent (event) {
        if (event === 'dire') {
            this.imageURL = '../../assets/images/dota2-mini-map-dire-hl.png';
            this.prevImageURL = this.imageURL;
            this.alertText = 'You are now editing Dire fraction';
            this.fractionDetails =
            'The Dire is a faction in Dota 2. It is characterized by a dark, burnt theme and is located'
            + ' in the top right half of the game map.';
            this.fractionSelected = 'Dire';
            this.fractionIcon = '../../assets/images/dire-icon.png';

            $('#alert-config')
                .removeClass('hide')
                    .addClass('show')
                        .show()
                            .removeClass('alert-radiant')
                                .addClass('alert-dire');
            $('div').each(function() {
                $(this)
                .find('div.config-card')
                    .removeClass('config-card-blur')
                        .removeClass ('config-card-radiant')
                            .addClass('config-card-dire');
            });
        } else {
            this.imageURL = '../../assets/images/dota2-mini-map-radiant-hl.png';
            this.prevImageURL = this.imageURL;
            this.alertText = 'You are now editing Radiant fraction';
            this.fractionDetails =
            'The Radiant is a faction in Dota 2. It is characterized by a bright, natural theme'
            + ' and is located in the bottom left half of the game map.';
            this.fractionSelected = 'Radiant';
            this.fractionIcon = '../../assets/images/radiant-icon.png';
            $('div').each(function() {
                $(this)
                .find('div.config-card')
                    .removeClass('config-card-blur')
                        .removeClass ('config-card-dire')
                            .addClass('config-card-radiant');
            });
            $('#alert-config')
                .removeClass('hide')
                    .addClass('show')
                        .show()
                            .removeClass('alert-dire')
                                .addClass('alert-radiant');
        }
    }
}
