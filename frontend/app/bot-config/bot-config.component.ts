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
                    this.id = res.id;
                    this.generateURL =
                        `${globalConfig['app']['API_URL']}/download/${this.id}`;
                    this.name = res.name;
                    this.description = res.description;
                    // problem area
                    // this.buildConfigData(JSON.parse(res.configuration));
                    this.readConfig(JSON.parse(res.configuration));
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
        setTimeout(null, 1000);
        const heroes = this.heroesComponent.getHeroes();
        console.log('heroes');
        console.log(heroes);
        console.log('config.heroPool.pool');
        console.log(config.heroPool.pool);
        if (config.heroPool.partitioned) {
            // TO DO
            config.heroPool.pool.forEach((heroSpec) => {
                const currentHero = heroes.find(tempHero => tempHero['name'] === heroSpec.name);
                if (currentHero !== undefined) {
                    selectedHeroes.push(currentHero);
                }
            });
        } else {
            config.heroPool.pool.forEach((heroSpec) => {
                const currentHero = heroes.find(tempHero => tempHero['name'] === heroSpec.name);
                if (currentHero !== undefined) {
                    selectedHeroes.push(currentHero);
                }
            });
        }
        // Building items object
        // const items = this.itemsComponent.getItems();
        // console.log(items);
        // if (config.heroes) {
        //     config.heroes.forEach((heroSpec) => {
        //         heroSpec.items = this.createComplexItemArray(heroSpec.items, items);
        //     });
        // }

        this.botConfigData.setConfig(config);
        console.log('selectedHeroes');
        console.log(selectedHeroes);
        this.botConfigData.setSelectedHeroes(selectedHeroes);
    }

    createComplexItemArray(items, validItems) {
        const itemsArr = [];
        if (items && items.length) {
            items.forEach((element) => {
                const tempArr = this.createComplexItem(element, validItems, 0);
                if (tempArr !== null) {
                    itemsArr.concat(tempArr);
                }
            });
        }
        return itemsArr;
    }

    // Recursive function to find complext item object
    createComplexItem(item, validItems, depth) {
        if (item) {
            const newItems = [];
            if (item.components) {
                if (item.components === 'null' || item.components === null || depth >= MAX_DEPTH) {
                    const newItem = validItems.find(tempItem => tempItem.name === item.name);
                    if (newItem !== undefined) {
                        newItems.push(newItem);
                    }
                } else if (item.components.length) {
                    item.components.forEach((element) => {
                        const tempItems = this.createComplexItem(element, validItems, depth + 1);
                        if (tempItems !== undefined) {
                            newItems.concat(tempItems);
                        }
                    });
                }
                return newItems;
            }
        }
        return null;
    }

}
