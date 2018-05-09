import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationFormat } from '../ConfigurationFormat';
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
    factionSelectionImageURL = '../../assets/images/dota2-mini-map-default.png';
    bothFactionsImageURL = '../../assets/images/dota2-mini-map-default.png';
    prevFactionSelectionImageURL = this.factionSelectionImageURL;
    prevBothFactionImageURL = this.bothFactionsImageURL;
    factionEditAlert = '';

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

    showHighlightSelectedFaction (faction) {
        this.factionSelectionImageURL = 
        '../../assets/images/dota2-mini-map-' + faction + '-hl.png';       
    }

    unHighlightSelectedFaction() {
        this.factionSelectionImageURL = this.prevFactionSelectionImageURL;
    }

    showHighlightBothFactions () {
        this.bothFactionsImageURL = '../../assets/images/dota2-mini-map.png';
    }

    unHighlightBothFactions() {
        this.bothFactionsImageURL = this.prevBothFactionImageURL ;
    }

    hideAlert() {
        $('#alertConfig')
        .addClass('hide')
        .hide();
    }

    selectFaction (selectedFaction,notSelectedFaction) {
        this.bothFactionsImageURL = '../../assets/images/dota2-mini-map-default.png';  
        this.prevBothFactionImageURL = this.bothFactionsImageURL;  
        $('#dotaMiniMap2').removeClass('alert-both');
        $('#dotaMiniMap')
        .removeClass('alert-' + notSelectedFaction)
        .addClass('alert-' + selectedFaction);
        this.factionSelectionImageURL = 
        '../../assets/images/dota2-mini-map-' + selectedFaction + '-hl.png';
        this.prevFactionSelectionImageURL = this.factionSelectionImageURL;
        this.factionEditAlert = 'You are now editing ' + selectedFaction + ' faction';
        $('#alertConfig')
        .removeClass('hide')
        .addClass('show')                    
        .show()
        .removeClass('alert-' + notSelectedFaction)
        .removeClass('alert-both')
        .addClass('alert-' + selectedFaction);
        $('div').each(function () {
            $(this)
            .find('div.config-card')
            .removeClass('config-card-blur')
            .removeClass ('config-card-both')
            .removeClass ('config-card-' + notSelectedFaction)
            .addClass('config-card-' + selectedFaction);
        });
    }

    selectBothFactions () {
        $('#dotaMiniMap2').addClass('alert-both');
        $('#dotaMiniMap')
        .removeClass('alert-radiant')
            .removeClass('alert-dire');
        // Reset image for selectFaction
        this.factionEditAlert = 'You are now editing both factions';
        this.bothFactionsImageURL = '../../assets/images/dota2-mini-map.png';
        this.prevBothFactionImageURL = this.bothFactionsImageURL;
        this.factionSelectionImageURL = '../../assets/images/dota2-mini-map-default.png';
        this.prevFactionSelectionImageURL = this.factionSelectionImageURL;
        $('div').each(function () {
            $(this)
            .find('div.config-card')
            .removeClass('config-card-blur')
            .removeClass ('config-card-radiant')
            .removeClass('config-card-dire')
            .addClass('config-card-both');
        });
        $('#alertConfig')
        .removeClass('hide')
        .addClass('show')
        .show()
        .removeClass('alert-dire')
        .removeClass('alert-radiant')
        .addClass('alert-both');
    }
}
