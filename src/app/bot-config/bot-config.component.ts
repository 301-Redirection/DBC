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
    imageURLBothFactions = '../../assets/images/dota2-mini-map.png';
    prevImageURL = this.imageURL;
    alertText = '';

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

    mouseOverBoth () {
        this.imageURLBothFactions = '../../assets/images/dota2-mini-map-both-blur.png';
    }

    mouseLeaveBoth() {
        this.imageURLBothFactions = '../../assets/images/dota2-mini-map.png' ;
    }

    clickEvent (event) {
        $('#alertFractionSelect').hide();
        this.imageURLBothFactions = '../../assets/images/dota2-mini-map.png';
        if (event === 'dire') {
            $('#dotaMiniMap2').removeClass('alert-radiant');
            $('#dotaMiniMap').addClass('alert-dire');
            this.imageURL = '../../assets/images/dota2-mini-map-dire-hl.png';
            this.prevImageURL = this.imageURL;
            this.alertText = 'You are now editing Dire faction';
            $('#alert-config')
                .removeClass('hide')
                    .addClass('show')
                        .show()
                            .removeClass('alert-radiant')
                                .removeClass('alert-both')
                                    .addClass('alert-dire');
            $('div').each(function() {
                $(this)
                .find('div.config-card')
                    .removeClass('config-card-blur')
                        .removeClass ('config-card-radiant')
                            .addClass('config-card-dire');
            });
        } else {
            $('#dotaMiniMap2').removeClass('alert-radiant');
            $('#dotaMiniMap').addClass('alert-radiant');
            this.imageURL = '../../assets/images/dota2-mini-map-radiant-hl.png';
            this.prevImageURL = this.imageURL;
            this.alertText = 'You are now editing Radiant faction';
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
                                .removeClass('alert-both')
                                    .addClass('alert-radiant');
        }
    }

    clickEventBoth () {
        $('#alertFractionSelect').hide();
        $('#dotaMiniMap2').addClass('alert-radiant');
        $('#dotaMiniMap').removeClass('alert-radiant');
        $('#dotaMiniMap').removeClass('alert-dire');
        this.alertText = 'You are now editing both factions';
        $('div').each(function() {
            $(this)
            .find('div.config-card')
                .removeClass('config-card-blur')
                    .removeClass ('config-card-radiant')
                        .removeClass('config-card-dire');
        });
        $('#alert-config')
                .removeClass('hide')
                    .addClass('show')
                        .show()
                            .removeClass('alert-dire')
                                .removeClass('alert-radiant')
                                    .addClass('alert-both');
    }
}
