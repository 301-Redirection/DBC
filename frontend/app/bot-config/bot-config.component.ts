import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    HostListener,
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

declare var swal: any;

@Component({
    selector: 'app-bot-config',
    templateUrl: './bot-config.component.html',
    styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit, AfterViewInit {
    pageTitle = 'Dota 2 Bot Configurator - Configuration';

    @ViewChild(TeamDesiresComponent) teamDesiresComponent: TeamDesiresComponent;
    @ViewChild(HeroesComponent) heroesComponent: HeroesComponent;
    @ViewChild(AbilitiesComponent) abilitiesComponent: AbilitiesComponent;
    @ViewChild(ItemsComponent) itemsComponent: ItemsComponent;

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        event.returnValue = true;
    }

    // Bot variables
    name: string = '';
    description: string = '';
    id: number = -1;
    selectedTab: string;
    isRetrieving = false;

    generateURL = '';
    isSaved: boolean;

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
                this.isSaved = true;
            } else {
                this.isSaved = false;
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

    save(andGenerate) {
        if (this.validateInfo()) {
            // call update bot from api service
            const requestBot = {
                id: this.id,
                name: this.name,
                description: this.description,
                configuration: this.botConfigData.getConfig(),
            };
            this.api.updateBot(requestBot).subscribe(
                (data) => {
                    this.isSaved = true;
                    if (this.id === -1) {
                        this.id = data.botConfig.id;
                    }
                    this.generateURL =
                        `${globalConfig['app']['API_URL']}/download/${this.id}`;

                    if (andGenerate) {
                        swal('Success!', 'Bot configuration saved and generated.', 'success');
                        window.open(this.generateURL);
                    } else {
                        swal('Success!', 'Bot configuration saved.', 'success');
                    }
                },
                () => {
                    swal('Error', 'Failed to save configuration. Please try again later.', 'error');
                },
            );
        }
    }

    generateScript(): void {
        if (this.isSaved) {
            window.open(this.generateURL);
        } else {
            const andGenerate = true;
            this.save(andGenerate);
        }
    }

    validateInfo(): boolean {
        if (this.name === '' || this.description === '') {
            swal('', 'Please enter your bot script name and description to continue.', 'warning');
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
        swal({
            title: 'Are you sure?',
            text: 'Once reset, all unsaved work will be lost.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willReset) => {
            if (willReset) {
                this.reset();
            }
        });
    }

    loadBotScript(id) {
        let res: any;
        this.isRetrieving = true;
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
                    this.botConfigData.setConfig(JSON.parse(res.configuration));
                    this.heroesComponent.getSavedHeroes();
                    this.isRetrieving = true;
                    // Need Saved heroes to load completely before moving on
                    this.heroesComponent.isSavedHeroesLoaded.subscribe((state) => {
                        if (state) {
                            const isDoneLoadingAbilities =
                                this.abilitiesComponent.loadSavedAbilities();
                            const isDoneLoadingItems = this.itemsComponent.getSavedItems();
                            // Wait for items to finish
                            if (isDoneLoadingAbilities && isDoneLoadingItems) {
                                this.isRetrieving = false;
                            }
                        }
                    });
                    this.heroesComponent.isSavedHeroesLoaded.next(false);
                }
            },
            (error) => {
                this.isRetrieving = false;
                console.log(error);
            },
        );
    }
}
