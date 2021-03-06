import { Component, OnInit, HostListener, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { BehaviorSubject } from 'rxjs';

declare var $: any;
declare var swal: any;

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
    isSavedHeroesLoaded = new BehaviorSubject(false);

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
            && event.target['localName'] !== 'textarea'
            && event.code.includes('Key')) {
            this.heroSearch += event.key;
        }
    }

    // Listen for escape key to clear search
    @HostListener('document:keydown.escape', ['$event'])
    clearSearch(event: KeyboardEvent) {
        if (this.selected === 'heroes'
            && event.target['localName'] !== 'input'
            && event.target['localName'] !== 'textarea') {
            this.heroSearch = '';
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
                if (this.selectedHeroesList && this.selectedHeroesList.length > 0) {
                    const newHeroList = [];
                    this.selectedHeroesList.forEach((minHero) => {
                        const detailedHero = this.allHeroes.find((bigHero) => {
                            return bigHero.name === minHero.name;
                        });
                        for (const i in detailedHero) {
                            if (detailedHero.hasOwnProperty(i)) {
                                minHero[i] = detailedHero[i];
                            }
                        }
                        newHeroList.push(minHero);
                    });
                    this.selectedHeroesList = newHeroList;
                    this.isSavedHeroesLoaded.next(true);
                    this.populateSelectedHeroPools();
                    this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
                }
            },
            (error) => {
                console.log(error);
            },
        );
    }

    saveHeroes(): void {
        const heroPool = this.createHeroPool();
        this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
        this.botConfigData.setHeroPool(heroPool);
    }

    getSavedHeroes(): void {
        this.populateSelectedHeroList(this.botConfigData.getSavedHeroes());
    }

    populateSelectedHeroList(heroes: any) {
        this.selectedHeroesList = [];
        const allHeroesLoaded = this.allHeroes.length > 0;
        heroes.forEach((hero) => {
            const detailedHero = this.allHeroes.find(searchHero => searchHero.name === hero.name);
            for (const i in detailedHero) {
                if (detailedHero.hasOwnProperty(i)) {
                    hero[i] = detailedHero[i];
                }
            }
            this.selectedHeroesList.push(hero);
        });
        if (allHeroesLoaded) {
            this.populateSelectedHeroPools();
            this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
        }
    }

    populateSelectedHeroPools() {
        const heroPools = this.botConfigData.getHeroPools();
        const heroesList = this.selectedHeroesList;
        const pools = heroPools.pool;
        pools.forEach((selectedHero) => {
            const heroMatch = heroesList.find(hero => hero.name === selectedHero.name);
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

        const poolIndex = this.pools.indexOf(pool);
        let shouldRemove = true;
        this.pools.forEach((pool, i) => {
            if (i !== poolIndex) {
                if (pool.indexOf(hero) !== -1) {
                    shouldRemove = false;
                }
            }
        });
        if (shouldRemove) {
            index = this.selectedHeroesList.indexOf(hero);
            this.selectedHeroesList.splice(index, 1);
        }

        document.getElementById(`poolLink${this.selectedPool}`).click();
        this.botConfigData.removeHeroFromPool(hero.name, poolIndex);
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
            swal('Oops!', 'This hero already exists in the selected pool.', 'warning');
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
                    heroPool.pool.push({ name: hero.name, position: i });
                });
            }
        }
        return heroPool;
    }

    setSelectedPool(pool: number): void {
        this.selectedPool = pool;
        this.hidePopovers();
    }

    confirmTogglePools(): void {
        this.hidePopovers();
        swal({
            title: 'Are you sure?',
            text: 'Once toggled, hero positions may change.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willToggle) => {
            if (willToggle) {
                this.togglePools();
            }
        });
    }

    togglePools(): void {
        this.partitioned = !this.partitioned;
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

    getPools() {
        return this.pools.filter((_x, i) => i < this.numberOfPools);
    }

    resetPools(): void {
        this.selectedPool = 0;
        this.pools = [[], [], [], [], []];
        this.botConfigData.setHeroPool(this.pools);
        this.selectedHeroesList = [];
        this.botConfigData.setSelectedHeroes([]);
    }

    triggerResetPools(): void {
        this.hidePopovers();
        swal({
            title: 'Are you sure?',
            text: 'Once reset, all selected heores will be lost.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willReset) => {
            if (willReset) {
                this.resetPools();
            }
        });
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
