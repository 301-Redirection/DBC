import { Component, OnInit } from '@angular/core';
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

    constructor(
        private api: ApiConnectService,
        private botConfigData: BotConfigDataService,
    ) { }

    ngOnInit() {
        document.getElementById('poolTabs').style.height = '0';
        document.getElementById('poolTabs').style.visibility = 'hidden';
        this.numberOfPools = 1;
        this.pools = [[], [], [], [], []];
        this.selectedPool = 0;
        this.getHeroes();

        // jquery functions
        this.popoverDismiss();
        this.selectedTab();
    }

    createHeroPool(): any {
        const heroPool = {
            partitioned: this.partitioned,
            pool: [],
        };

        for (let i = 0; i < this.numberOfPools; i += 1) {
            if (this.pools[i]) {
                this.pools[i].forEach((hero) => {
                    heroPool.pool.push({ hero: hero.programName, position: i });
                });
            }
        }
        return heroPool;
    }

    saveHeroes(): void {
        const heroPool = this.createHeroPool();
        this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
        this.botConfigData.setHeroPool(heroPool);
    }

    getHeroes(): void {
        // database call to retrieve all dota heroes
        this.api.getAllHeroes().subscribe(
            (data) => {
                this.allHeroes = data['heroes'];
                this.getHeroImages();
                this.sortHeroData();
            },
            (error) => {
                console.log(error);
            },
        );
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

    setSelectedPool(pool: number): void {
        this.selectedPool = pool;
        this.hidePopovers();
    }

    togglePools(): void {
        this.partitioned = !this.partitioned;
        this.hidePopovers();
        if (confirm('Are you sure you want to toggle pools?')) {
            if (this.numberOfPools > 1) {
                this.numberOfPools = 1;
                document.getElementById('poolTabs').style.height = '0';
                document.getElementById('poolTabs').style.visibility = 'hidden';

                const bigPool = [];
                this.pools.forEach((pool) => {
                    pool.forEach((hero) => {
                        if (bigPool.indexOf(hero) === -1 && !this.isDuplicate(bigPool, hero)) {
                            bigPool.push(hero);
                        }
                    });
                });

                this.resetPools();
                this.pools[0] = bigPool;
                this.setSelectedPool(0);
            } else {
                this.numberOfPools = 5;
                document.getElementById('poolTabs').style.height = '42px';
                document.getElementById('poolTabs').style.visibility = 'visible';
                const pool1 = this.pools[0];
                this.resetPools();
                this.pools[0] = pool1;
                this.setSelectedPool(0);
            }
            this.setSelectedHeroesList();
        }
    }

    setSelectedHeroesList(): void {
        this.selectedHeroesList = [];
        this.pools.forEach((pool) => {
            pool.forEach((hero) => {
                this.selectedHeroesList.push(hero);
            });
        });
        this.saveHeroes();
    }

    moveSelectedHero(hero: any): void {
        if (!this.checkHeroExists(hero)) {
            this.pools[this.selectedPool].push(hero);
            document.getElementById(`poolLink${this.selectedPool}`).click();
            this.openSelectedTab();
            this.setSelectedHeroesList();
        }
    }

    addHero(hero: any, pool: number): void {
        this.setSelectedPool(pool);
        if (!this.checkHeroExists(hero)) {
            this.pools[this.selectedPool].push(hero);
            this.unhighlightPool(pool);
            document.getElementById(`poolLink${this.selectedPool}`).click();
            this.openSelectedTab();
            this.setSelectedHeroesList();
        }
    }

    removeHero(hero: any, pool: any): void {
        const index = pool.indexOf(hero);
        if (index !== -1) {
            pool.splice(index, 1);
        }

        document.getElementById(`poolLink${this.selectedPool}`).click();
        this.setSelectedHeroesList();
    }

    isDuplicate(pool: any, hero: any): boolean {
        if (pool.find(x => x.id === hero.id)) {
            return true;
        }
        return false;
    }

    checkHeroExists(hero: any): boolean {
        if (this.pools[this.selectedPool].find(x => x.id === hero.id)) {
            alert('This hero already exists in the selected pool.');
            return true;
        }
        return false;
    }

    setSelectedHero(hero: any): void {
        this.selectedHero = hero;
    }

    getPools() {
        return this.pools.filter((x, i) => i < this.numberOfPools);
    }

    highlightPool(pool: number): void {
        document.getElementById(`poolLink${pool}`).style.borderColor = '#a3a3a3';
        document.getElementById(`poolPlusIconCont${pool}`).style.visibility = 'visible';
    }

    unhighlightPool(pool: number): void {
        document.getElementById(`poolLink${pool}`).style.borderColor = 'transparent';
        document.getElementById(`poolPlusIconCont${pool}`).style.visibility = 'hidden';
    }

    resetPools(): void {
        this.selectedPool = 0;
        this.pools = [[], [], [], [], []];
        this.setSelectedHeroesList();
    }

    triggerResetPools(): void {
        this.hidePopovers();
        if (confirm('Are you sure you want to reset?')) {
            this.resetPools();
        }
    }

    triggerPopover(target: HTMLElement, hero: any) {
        $(target).popover({
            animation: true,
            placement: 'right',
            html: true,
            content: $(`#${hero.programName}`).html(),
            template: $('#heroesPopoverTemplate').html(),
        });
    }

    hidePopovers() {
        $('[data-toggle="popover"]').popover('hide');
    }

    popoverDismiss(): void {
        $(document).ready(() => {
            $('heroComponent').click((event) => {
                this.hidePopovers();

                if (event.target.className === 'popover-zone' ||
                    event.target.className === 'popover-zone selected-popover-zone') {
                    $(`#${event.target.id}`).popover('show');
                } else if (event.target.parentElement.className === 'popover-zone' ||
                    event.target.parentElement.className === 'popover-zone selected-popover-zone') {
                    $(`#${event.target.parentElement.id}`).popover('show');
                }
            });
        });
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
                    !idExceptions.includes(target.parentElement.id)) {
                    this.closeSelectedTab();
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
