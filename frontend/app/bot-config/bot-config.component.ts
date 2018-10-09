import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiConnectService } from '../services/api-connect.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as globalConfig from '../../../config/config.js';
import { TeamDesiresComponent } from './team-desires/team-desires.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { ItemsComponent } from './items/items.component';
import { BotConfigDataService } from '../services/bot-config-data.service';
import {
    ConfigurationFormat,
} from '../services/ConfigurationFormat';

const MAX_DEPTH = 10;

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
    selectedTab: string;

    // State variables to reload bots
    heroesLoaded: boolean;
    itemsLoaded: boolean;
    config: ConfigurationFormat;

    generateURL = '';

    constructor
    (
        private title: Title,
        private api: ApiConnectService,
        private route: ActivatedRoute,
        private router: Router,
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
        this.heroesLoaded = false;
        this.itemsLoaded = false;
        this.botConfigData.reset();
        this.checkLoadedScript();
        this.selectedTab = 'info';
    }

    ngAfterViewInit() {}

    setTabSelected(tab: string) {
        this.selectedTab = tab;
    }

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
                    if (this.id === -1) {
                        this.id = data.botConfig.id;
                        this.router.navigate(['/bot-config', { botScriptID: this.id }]);
                    }
                    alert('Bot configurations saved!');
                },
                (error) => {
                    alert('Failed to save configuration. Please try agin later.');
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
        this.botConfigData.reset();
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
                if (res != null) {
                    this.config = JSON.parse(res.configuration);
                    this.id = res.id;
                    this.generateURL =
                        `${globalConfig['app']['API_URL']}/download/${this.id}`;
                    this.name = res.name;
                    this.description = res.description;
                    // problem area
                    // this.buildConfigData(JSON.parse(res.configuration));
                }
            },
            (error) => {
                console.log(error);
            },
        );
    }

    /**
     * Reads the simplified server configuration and creates the template configuration
     * that the frontend manipulates
     */
    readConfig(config: ConfigurationFormat): void {
        // Building hero object
        const selectedHeroes = [];
        
        // Building items object
        const items = this.itemsComponent.getItems();
        console.log(items);
        if (config.heroes) {
            config.heroes.forEach((heroSpec) => {
                heroSpec.items = this.createComplexItemArray(heroSpec.items, items);
            });
        }

        this.botConfigData.setConfig(config);
        console.log('selectedHeroes');
        console.log(selectedHeroes);
        this.botConfigData.setSelectedHeroes(selectedHeroes);
    }

    heroesReady() {
        // console.log('config');
        // console.log(this.config);
        const selectedHeroes = [];
        // console.log('heroes ready');
        this.heroesLoaded = true;
        const heroes = this.heroesComponent.getHeroes();
        // console.log('heroes');
        // console.log(heroes);
        // console.log('config.heroPool.pool');
        // console.log(this.config.heroPool.pool);
        if (this.config.heroPool.partitioned) {
            // TO DO
            this.config.heroPool.pool.forEach((heroSpec) => {
                const currentHero = heroes.find(tempHero => tempHero['programName'] === heroSpec.name);
                if (currentHero !== undefined) {
                    selectedHeroes.push(currentHero);
                }
                else {
                    // console.log('ignoring ' + heroSpec.name);
                }
            });
        } else {
            this.config.heroPool.pool.forEach((heroSpec) => {
                const currentHero = heroes.find(tempHero => tempHero['programName'] === heroSpec.name);
                if (currentHero !== undefined) {
                    selectedHeroes.push(currentHero);
                }
                else {
                    // console.log('ignoring ' + heroSpec.name);
                }
            });
        }
        // console.log('selectedHeroes');
        // console.log(selectedHeroes);
        this.botConfigData.setSelectedHeroes(selectedHeroes);
        // this.abilitiesComponent.reset();
        // console.log(this.heroesComponent.getHeroes());
    }

    itemsReady() {
        console.log('items ready');
        this.itemsLoaded = true;
        // Building items object
        const items = this.itemsComponent.getItems();
        // console.log('items in itemsReady');
        // console.log(items);
        if (this.config.heroes) {
            this.config.heroes.forEach((heroSpec) => {
                heroSpec.items = this.createComplexItemArray(heroSpec.items, items);
                // console.log(heroSpec.name + "'s items:");
                // console.log(heroSpec);
            });
        }
        else {
            // in case there is a race condition keep calling this
            // so that the config.heroes exists
            this.itemsReady()
        }
        console.log(this.config.heroes);
    }

    createComplexItemArray(items, validItems) {
        console.log('createComplexItemArray');
        let itemsArr = [];
        if (items && items.length) {
            items.forEach((element) => {
                // console.log('------> ' + element.name);
                const tempArr = this.createComplexItem(element, validItems, 0);
                // console.log(tempArr);
                if (tempArr !== null) {
                    // console.log('tempArr');
                    // console.log(tempArr);
                    // console.log('itemsArr before concat');
                    // console.log(itemsArr);
                    itemsArr = itemsArr.concat(tempArr);
                    // console.log('itemsArr after concat');
                    // console.log(itemsArr);
                }
                else {
                    // console.log('tempArr was nulL!');
                }
            });
        }
        // console.log('result => ');
        // console.log(itemsArr);
        return itemsArr;
    }

    // Recursive function to find complext item object
    createComplexItem(item, validItems, depth) {
        if (item) {
            let newItems = [];
            if (item.components) {
                if (item.components === 'null' || item.components === null || depth >= MAX_DEPTH) {
                    const newItem = validItems.find(tempItem => tempItem.name === item.name);
                    if (newItem !== undefined) {
                        // console.log('pushed ') + newItem);
                        // console.log(newItem)
                        newItems.push(newItem);
                    }
                    else {
                        console.log('ignoring ' + item.name);
                    }
                } else if (item.components.length) {
                    item.components.forEach((element) => {
                        const tempItems = this.createComplexItem(element, validItems, depth + 1);
                        if (tempItems !== undefined) {
                            // console.log('pushed ');
                            // console.log(tempItems);
                            newItems = newItems.concat(tempItems);
                        }
                        else {
                            // console.log('ignoring array ' + item.name);
                        }
                    });
                }
                return newItems;
            }
        }
        return null;
    }

}
