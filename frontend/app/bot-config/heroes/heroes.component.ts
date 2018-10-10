import { Component, OnInit, HostListener, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { BotConfigDataService } from '../../services/bot-config-data.service';

// Import JQuery
declare var $: any;

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {

    @Input('selected') selected: string;

    // Variables
    pools: any;
    numberOfPools: number;
    selectedPool: number;
    selectedHero: any;
    selectedHeroesList: any;
    allHeroes = [];

    // hero category objects
    strengthHeroes = [];
    agilityHeroes = [];
    intelligenceHeroes = [];
    heroSearch: String;

    // attribute urls
    strURL = '/assets/images/strength.png';
    agiURL = '/assets/images/agility.png';
    intURL = '/assets/images/intelligence.png';

    allPools = [];
    partitioned = false;

    clickTimeoutId: any;

    optionsSource: SortablejsOptions = {
        group: {
            name: 'clone-group',
            pull: 'clone',
            put: false,
        },
        sort: false,
    };

    optionsTarget: SortablejsOptions = {
        group: 'clone-group',
        sort: false,
    };

    // Listen for key press to update heroSearch
    @HostListener('document:keydown', ['$event'])
    searchEvent(event: KeyboardEvent) {
        if (this.selected === 'heroes'
            && event.target['localName'] !== 'input'
            && event.target['localName'] !== 'textarea') {
            if (event.key === 'Backspace') {
                this.heroSearch = this.heroSearch.slice(0, -1);
            } else if (
                (65 <= event.keyCode && event.keyCode <= 90) ||
                (97 <= event.keyCode && event.keyCode <= 122)
            ) {
                this.heroSearch += event.key;
            }
        }
    }

    constructor(
        private api: ApiConnectService,
        private botConfigData: BotConfigDataService,
    ) {}

    ngOnInit() {
        document.getElementById('poolTabs').style.height = '0';
        document.getElementById('poolTabs').style.visibility = 'hidden';
        this.numberOfPools = 1;
        this.pools = [[], [], [], [], []];
        this.selectedPool = 0;
        this.heroSearch = '';
        this.selectedHeroesList = [];
        this.getHeroes();
        this.selectedTab();
    }

    /*****************/
    /*    General    */
    /*****************/

    // This is only used by a parent component if this component needs to be reset
    reset(): void {
        this.resetPools();
    }

    // Check if loaded script from db
    checkIfSavedBotScript() {
        this.botConfigData.notifyIsLoadedScript().subscribe((isLoadedScript) => {
            if (isLoadedScript) {
                this.getSavedHeroes();
            }
        });
    }

    /********************/
    /* Hero Persistance */
    /********************/

    getHeroes(): void {
        // database call to retrieve all dota heroes
        this.api.getAllHeroes().subscribe(
            (data) => {
                this.allHeroes = data['heroes'];
                this.getHeroImages();
                this.sortHeroData();
                this.checkIfSavedBotScript();
            },
            (error) => {
                console.log(error);
            },
        );
    }

    saveHeroes(): void {
        const heroPool = this.createHeroPool();
        this.botConfigData.updateSelectedHeroes(this.selectedHeroesList);
        this.botConfigData.setHeroPool(heroPool);
    }

    getSavedHeroes(): void {
        const savedHeroes = this.botConfigData.getSavedHeroes();
        const heroNames = [];
        savedHeroes.forEach((heroObject) => {
            heroNames.push(heroObject['name']);
        });
        this.populateSelectedHeroList(heroNames);
        this.populateSelectedHeroPools();
    }

    populateSelectedHeroList(heroNames: any) {
        this.selectedHeroesList = [];
        heroNames.forEach((name) => {
            this.selectedHeroesList.push(this.allHeroes.find(hero => hero.programName === name));
        });
        // Reflect regenerate hero list in service
        this.botConfigData.updateSelectedHeroes(this.selectedHeroesList);
    }

    populateSelectedHeroPools() {
        const heroPools = this.botConfigData.getHeroPools();
        const heroesList = this.selectedHeroesList;
        const pools = heroPools.pool;
        pools.forEach((selectedHero) => {
            const heroMatch = heroesList.find(hero => hero.programName === selectedHero.name);
            this.pools[selectedHero.position].push(heroMatch);
        });

        if (heroPools.partitioned) {
            this.showPoolsTab(5);
        } else {
            this.showPoolsTab(1);
        }
    }

    setSelectedHeroesList(heroes): void {
        this.pools.forEach((pool) => {
            pool.forEach((hero) => {
                if (heroes.indexOf(hero) === -1) {
                    heroes.push(hero);
                }
            });
        });
        this.saveHeroes();
    }

    /************************/
    /* Hero Item Management */
    /************************/

    moveSelectedHero(hero: any): void {
        clearTimeout(this.clickTimeoutId);
        this.clickTimeoutId = 0;
        if (!this.checkHeroExists(hero)) {
            this.pools[this.selectedPool].push(hero);
            document.getElementById(`poolLink${this.selectedPool}`).click();
            this.openSelectedTab();
            this.setSelectedHeroesList(this.selectedHeroesList);
        }
    }

    addHero(hero: any, pool: number): void {
        this.setSelectedPool(pool);
        if (!this.checkHeroExists(hero)) {
            this.pools[this.selectedPool].push(hero);
            this.unhighlightPool(pool);
            document.getElementById(`poolLink${this.selectedPool}`).click();
            this.openSelectedTab();
            this.setSelectedHeroesList(this.selectedHeroesList);
        }
    }

    removeHero(hero: any, pool: any): void {
        let index = pool.indexOf(hero);
        if (index !== -1) {
            pool.splice(index, 1);
        }

        index = this.selectedHeroesList.indexOf(hero);
        if (index !== -1) {
            this.selectedHeroesList.splice(index, 1);
        }

        document.getElementById(`poolLink${this.selectedPool}`).click();
        this.botConfigData.removeHeroSpecification(hero.programName);
        this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
    }

    onRemoveHero(event: any): void {
        this.removeHero(event.hero, event.pool);
    }

    setSelectedHero(hero: any): void {
        this.selectedHero = hero;
    }

    checkHeroExists(hero: any): boolean {
        if (this.pools[this.selectedPool].find(x => x.id === hero.id)) {
            alert('This hero already exists in the selected pool.');
            return true;
        }
        return false;
    }

    getHeroImages(): void {
        this.allHeroes.forEach((hero) => {
            hero.image = this.api.getImageURL(hero.url);
            hero.qImage = this.api.getImageURL(hero.url_q);
            hero.wImage = this.api.getImageURL(hero.url_w);
            hero.eImage = this.api.getImageURL(hero.url_e);
            hero.rImage = this.api.getImageURL(hero.url_r);
        });
    }

    sortHeroData(): void {
        // sort heroes alphabetically
        this.allHeroes.sort((a, b) => {
            return a.niceName.localeCompare(b.niceName);
        });

        // distribute into separate arrays based on primary attribute
        this.allHeroes.forEach((hero) => {
            if (hero.primaryAttribute === 'str') {
                this.strengthHeroes.push(hero);
                hero.attributeImage = this.strURL;
            } else if (hero.primaryAttribute === 'agi') {
                this.agilityHeroes.push(hero);
                hero.attributeImage = this.agiURL;
            } else if (hero.primaryAttribute === 'int') {
                this.intelligenceHeroes.push(hero);
                hero.attributeImage = this.intURL;
            }
        });
    }

    /*****************/
    /* Pools Manager */
    /*****************/

    createHeroPool(): any {
        const heroPool = {
            partitioned: this.partitioned,
            pool: [],
        };

        for (let i = 0; i < this.numberOfPools; i += 1) {
            if (this.pools[i]) {
                this.pools[i].forEach((hero) => {
                    heroPool.pool.push({ name: hero.programName, position: i });
                });
            }
        }
        return heroPool;
    }

    setSelectedPool(pool: number): void {
        this.selectedPool = pool;
        this.hidePopovers();
    }

    togglePools(): void {
        this.partitioned = !this.partitioned;
        this.hidePopovers();
        if (confirm('Are you sure you want to toggle pools?')) {
            if (this.numberOfPools > 1) {
                this.showPoolsTab(1);
                const bigPool = [];
                this.pools.forEach((pool) => {
                    pool.forEach((hero) => {
                        if (bigPool.indexOf(hero) === -1) {
                            bigPool.push(hero);
                        }
                    });
                });

                this.selectedPool = 0;
                this.pools = [[], [], [], [], []];
                this.pools[0] = bigPool;
                this.setSelectedPool(0);
            } else {
                this.showPoolsTab(5);
                const pool1 = this.pools[0];
                this.selectedPool = 0;
                this.pools = [[], [], [], [], []];
                this.pools[0] = pool1;
                this.setSelectedPool(0);
            }
            this.saveHeroes();
        }
    }

    getPools() {
        return this.pools.filter((_x, i) => i < this.numberOfPools);
    }

    resetPools(): void {
        this.selectedPool = 0;
        this.pools = [[], [], [], [], []];
        this.selectedHeroesList = [];
        this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
        this.botConfigData.clearSelectedHeroes(this.selectedHeroesList);
    }

    triggerResetPools(): void {
        this.hidePopovers();
        if (confirm('Are you sure you want to reset?')) {
            this.resetPools();
        }
    }

    showPoolsTab(numPools: number) {
        if (numPools === 1) {
            this.numberOfPools = 1;
            document.getElementById('poolTabs').style.height = '0';
            document.getElementById('poolTabs').style.visibility = 'hidden';
        } else if (numPools === 5) {
            this.numberOfPools = 5;
            document.getElementById('poolTabs').style.height = '42px';
            document.getElementById('poolTabs').style.visibility = 'visible';
        }
        this.setSelectedPool(0);
    }

    highlightPool(pool: number): void {
        document.getElementById(`poolLink${pool}`).style.borderColor = '#a3a3a3';
        document.getElementById(`poolPlusIconCont${pool}`).style.visibility = 'visible';
    }

    unhighlightPool(pool: number): void {
        document.getElementById(`poolLink${pool}`).style.borderColor = 'transparent';
        document.getElementById(`poolPlusIconCont${pool}`).style.visibility = 'hidden';
    }

    /********************/
    /* JQuery Functions */
    /********************/

    hidePopovers() {
        $('.popover-zone').popover('hide');
    }

    selectedTab(): void {
        // TODO: fix this code so it's more generic and fits with angular
        $(document).ready(() => {
            $('#selectedFrame').css('bottom', '-200px');

            $(window).scroll(() => {
                const scrollTop = $(document).scrollTop();
                if (scrollTop < 2390) {
                    $('#selectedFrameChevron').css('visibility', 'visible');
                } else {
                    $('#selectedFrameChevron').css('visibility', 'hidden');
                }
            });

            $('#selectedFrame').on('dragenter', () => {
                this.openSelectedTab();
            });

            $('#selectedFrameHeader').on('click', () => {
                if ($('#selectedFrame').css('bottom') === '-10px') {
                    this.closeSelectedTab();
                } else {
                    this.openSelectedTab();
                }
            });

            $('body').click((event) => {
                const idInstances = ['selectedFrameHeader', 'cardHeaderText', 'selectedButtons'];
                const classExceptions = [
                    'popover-body',
                    'popover-zone selected-popover-zone',
                    'popover-item',
                    'hero-name',
                    'drop-zone',
                    'nav-link pool-nav-link active',
                    'nav-link pool-nav-link',
                    'card-body selected-card-body',
                    'text-center',
                    'hero-attributes',
                    'figure-caption text-center',
                    'SVGAnimatedString',
                    'pool-plus-icon-cont',
                ];
                const idExceptions = ['removeIcon', 'timesIcon', 'selectedFrameChevron'];
                const target = event.target;

                if ((idInstances.includes(target.id)) &&
                    $('#selectedFrame').css('bottom') !== '-10px') {
                    this.openSelectedTab();
                } else if (target.id === 'resetPoolsBtn' || target.id === 'togglePoolsBtn') {
                    this.openSelectedTab();
                } else if (!classExceptions.includes(target.className) &&
                    !idExceptions.includes(target.id) &&
                    !idExceptions.includes(target.parentElement.id) && this.clickTimeoutId === 0) {
                    this.clickTimeoutId = setTimeout(() => this.closeSelectedTab(), 290);
                }
            });
        });
    }

    openSelectedTab() {
        $('#selectedFrame').css('bottom', '-10px');
        $('#selectedFrameChevron').addClass('fa-chevron-down').removeClass('fa-chevron-up');
    }

    closeSelectedTab() {
        $('#selectedFrame').css('bottom', '-200px');
        $('#selectedFrameChevron').addClass('fa-chevron-up').removeClass('fa-chevron-down');
    }

}