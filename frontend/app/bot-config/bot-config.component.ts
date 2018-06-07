import {
    Component,
    OnInit,
    AfterViewInit,
} from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_NAMES } from '../routes/routes.config';
import * as globalConfig from '../../../config/config.js';
import { ConfiguratorComponent } from './configurator/configurator.component';

declare var $: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit, AfterViewInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';
    factionSelectionImageURL = '../../assets/images/dota2-mini-map-default.png';
    bothFactionsImageURL = '../../assets/images/dota2-mini-map-default.png';
    prevFactionSelectionImageURL = this.factionSelectionImageURL;
    prevBothFactionImageURL = this.bothFactionsImageURL;
    factionEditAlert = '';

    // Bot variables
    name: string = 'test';
    description: string = 'test';
    id: number = -1;
    faction: string = 'both';

    // configuration object
    configuration: ConfigurationFormat = {
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

    sampleConditions: Condition[] = [
        {
            trigger: 1,
            operator: 3,
            conditional: 0.0,
            action: 2,
            value: 0.25,
        },
        {
            trigger: 3,
            operator: 2,
            conditional: 0.0,
            action: 2,
            value: 0.25,
        },
        {
            trigger: 1,
            operator: 4,
            conditional: 0.3,
            action: 1,
            value: 0.5,
        },
    ];

    // bot = {
    //     id: this.id,
    //     name: this.name,
    //     description: this.description,
    //     configuration: this.configuration,
    //     faction: this.factionSelected,
    // };

    generateURL = '';

    constructor
    (private title: Title, private api: ApiConnectService, private route: ActivatedRoute) {
        this.title.setTitle(this.pageTitle);
        this.route.params.subscribe((params) => {
            if (params['botScriptID']) {
                this.loadBotScript(params['botScriptID']);
            }
        });
    }

    ngOnInit() { }

    ngAfterViewInit() {}

    updateCondition(condition: Condition, index: number): void {
        this.sampleConditions[index] = condition;
        console.log(condition);
        console.log(this.sampleConditions);
    }

    trackByFn(index, item) {
        return index;
    }

    save() {
        if (this.validateInfo()) {
            // call update bot from api service
            const requestBot = {
                id: this.id,
                name: this.name,
                description: this.description,
                configuration: this.configuration,
                faction: this.faction,
            };
            const response = this.api.updateBot(requestBot).subscribe((data) => {
                console.log(globalConfig);
                this.generateURL =
                    `${globalConfig['app']['API_URL']}/download/${data.botConfig.id}`;
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

    showHighlightSelectedFaction (faction) {
        this.factionSelectionImageURL =
        `../../assets/images/dota2-mini-map-${faction}-hl.png`;
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

    selectFaction (selectedFaction, notSelectedFaction) {
        this.faction = selectedFaction;
        this.bothFactionsImageURL = '../../assets/images/dota2-mini-map-default.png';
        this.prevBothFactionImageURL = this.bothFactionsImageURL;
        $('#dotaMiniMap2').removeClass('alert-both');
        $('#dotaMiniMap')
            .removeClass(`alert-${notSelectedFaction}`)
            .addClass(`alert-${selectedFaction}`);
        this.factionSelectionImageURL =
            `../../assets/images/dota2-mini-map-${selectedFaction}-hl.png`;
        this.prevFactionSelectionImageURL = this.factionSelectionImageURL;
        this.factionEditAlert = `You are now editing ${selectedFaction} faction`;
        $('#alertConfig')
            .removeClass('hide')
            .addClass('show')
            .show()
            .removeClass(`alert-${notSelectedFaction}`)
            .removeClass('alert-both')
            .addClass(`alert-${selectedFaction}`);
        $('div').each(() => {
            $(this)
                .find('div.config-card')
                .removeClass('config-card-blur')
                .removeClass('config-card-both')
                .removeClass(`config-card-${notSelectedFaction}`)
                .addClass(`config-card-${selectedFaction}`);
        });
    }

    selectBothFactions () {
        this.faction = 'both';
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
        $('div').each(() => {
            $(this)
                .find('div.config-card')
                .removeClass('config-card-blur')
                .removeClass('config-card-radiant')
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

    reset () {
        location.reload();
    }

    loadBotScript(id) {
        let res: any;
        const response = this.api.getSpecificBot(id).subscribe((data) => {
            res = data['botConfig'];
            res = res[0];
            if (res != null) {
                console.log(res);
                this.id = res.id;
                this.name = res.name;
                this.configuration = JSON.parse(res.configuration);
                this.description = res.description;
                this.faction = res.faction;

                if (this.faction === 'radiant') {
                    this.selectFaction('radiant', 'dire');
                }else if (this.faction === 'dire') {
                    this.selectFaction('dire', 'radiant');
                }else {
                    this.selectBothFactions();
                }

            }
        });
    }
}
