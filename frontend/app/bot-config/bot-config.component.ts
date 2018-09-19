import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiConnectService } from '../services/api-connect.service';
import { ActivatedRoute } from '@angular/router';
import * as globalConfig from '../../../config/config.js';
import { TeamDesiresComponent } from './team-desires/team-desires.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { ItemsComponent } from './items/items.component';
import { BotConfigDataService } from '../services/bot-config-data.service';

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit, AfterViewInit {
    pageTitle = 'Dota 2 Bot Scripting - Configuration';

    @ViewChild(TeamDesiresComponent) teamDesiresComponent: TeamDesiresComponent;
    @ViewChild(HeroesComponent) heroesComponent: HeroesComponent;
    @ViewChild(AbilitiesComponent) abilitiesComponent: AbilitiesComponent;
    @ViewChild(ItemsComponent) itemsComponent: ItemsComponent;

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
        private botConfigData: BotConfigDataService,
    ) {
        this.title.setTitle(this.pageTitle);
        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap['params']['botScriptID']) {
                this.loadBotScript(paramMap['params']['botScriptID']);
            }
        });
    }

    ngOnInit() { 
        this.checkLoadedScript();
    }

    ngAfterViewInit() {}

    save() {
        if (this.validateInfo()) {
            // call update bot from api service
            const requestBot = {
                id: this.id,
                name: this.name,
                description: this.description,
                configuration: this.botConfigData.getConfig(),
            };
            console.log(requestBot);
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

    log(): void {
        console.log(this.botConfigData.getConfig());
    }

    validateInfo(): boolean {
        if (this.name === '' || this.description === '') {
            alert('Please enter your bot script name and description');
            return false;
        }
        return true;
    }

    checkLoadedScript() {
        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap['params']['botScriptID'] === undefined) {
                this.reset();
            }
        });
    }

    reset () {
        this.name = '';
        this.description = '';
        this.teamDesiresComponent.reset();
        this.heroesComponent.reset();
        this.abilitiesComponent.reset();
        this.itemsComponent.reset();
    }

    confirmReset() {
        if (confirm('Are you sure you want to reset? All unsaved configurations will be lost.')) {
            this.reset();
        }
    }

    loadBotScript(id) {
        let res: any;
        this.api.getSpecificBot(id).subscribe(
            (data) => {
                res = data['botConfig'];
                res = res[0];
                //console.log(res);
                if (res != null) {
                    this.id = res.id;
                    this.name = res.name;
                    // this.configuration = JSON.parse(res.configuration);
                    this.description = res.description;
                    this.botConfigData.setConfig(JSON.parse(res.configuration));
                    // console.log(this.botConfigData.getConfig());
                    // console.log(this.botConfigData.getHeroesSpecification());
                }
            },
            (error) => {
                console.log(error);
            },
        );
    }
}
