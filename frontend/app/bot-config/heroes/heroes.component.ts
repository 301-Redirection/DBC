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
    numberOfPools: any;
    selectedPool: number;
    selectedPoolArray: any;
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

    pool1 = [];
    pool2 = [];
    pool3 = [];
    pool4 = [];
    pool5 = [];
    allPools = [];

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
        this.numberOfPools = [1];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;
        this.getHeroes();

        // jquery functions
        this.popoverDismiss();
        this.selectedTab();
    }

    saveHeroes(): void {
        this.botConfigData.setSelectedHeroes(this.selectedHeroesList);
    }

    getHeroes(): void {
        // database call to retrieve all dota heroes
        this.api.getAllHeroes().subscribe((data) => {
            this.allHeroes = data['heroes'];
            this.getHeroImages();
            this.sortHeroData();
        });
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
            hero.poolIndexes = [];
        });
    }

    setSelectedPool(pool: number): void {
        this.selectedPool = pool;
        switch (pool) {
        case 1:
            this.selectedPoolArray = this.pool1;
            break;
        case 2:
            this.selectedPoolArray = this.pool2;
            break;
        case 3:
            this.selectedPoolArray = this.pool3;
            break;
        case 4:
            this.selectedPoolArray = this.pool4;
            break;
        case 5:
            this.selectedPoolArray = this.pool5;
            break;
        }
        this.hidePopovers();
    }

    togglePools(): void {
        this.hidePopovers();
        if (confirm('Are you sure you want to toggle pools? All changes will be lost.')) {
            if (this.numberOfPools.length > 1) {
                this.numberOfPools = [1];
                document.getElementById('poolTabs').style.height = '0';
                document.getElementById('poolTabs').style.visibility = 'hidden';

                this.pool2.forEach((hero) => {
                    this.pool1.push(hero);
                });
                this.pool3.forEach((hero) => {
                    this.pool1.push(hero);
                });
                this.pool4.forEach((hero) => {
                    this.pool1.push(hero);
                });
                this.pool5.forEach((hero) => {
                    this.pool1.push(hero);
                });

                const tempPool = this.pool1;
                this.resetPools();
                this.pool1 = tempPool;
                this.selectedPoolArray = this.pool1;
            } else {
                this.numberOfPools = [1, 2, 3, 4, 5];
                document.getElementById('poolTabs').style.height = '42px';
                document.getElementById('poolTabs').style.visibility = 'visible';
                this.resetPools();
            }
        }
    }

    setSelectedHeroesList(): void {
        this.selectedHeroesList = [];
        if (this.numberOfPools.length === 1) {
            this.selectedHeroesList = this.pool1;
        } else {
            this.pool1.forEach((hero) => {
                this.selectedHeroesList.push(hero);
            });
            this.pool2.forEach((hero) => {
                this.selectedHeroesList.push(hero);
            });
            this.pool3.forEach((hero) => {
                this.selectedHeroesList.push(hero);
            });
            this.pool4.forEach((hero) => {
                this.selectedHeroesList.push(hero);
            });
            this.pool5.forEach((hero) => {
                this.selectedHeroesList.push(hero);
            });
        }
        this.saveHeroes();
    }

    moveSelectedHero(hero: any): void {
        if (!this.checkHeroExists(hero)) {
            hero.poolIndexes.push(this.selectedPool);
            this.selectedPoolArray.push(hero);
            document.getElementById(`poolLink${this.selectedPool - 1}`).click();
            this.openSelectedTab();
            this.setSelectedHeroesList();
        }
    }

    addHero(hero: any, pool: number): void {
        this.setSelectedPool(pool);
        if (!this.checkHeroExists(hero)) {
            hero.poolIndexes.push(pool);
            this.selectedPoolArray.push(hero);
            this.unhighlightPool(pool);
            document.getElementById(`poolLink${this.selectedPool - 1}`).click();
            this.openSelectedTab();
            this.setSelectedHeroesList();
        }
    }

    removeHero(hero: any, pool: any): void {
        let index = pool.indexOf(hero);
        if (index !== -1) {
            pool.splice(index, 1);
        }
        index = hero.poolIndexes.indexOf(pool);
        if (index !== -1) {
            hero.poolIndexes.splice(index, 1);
        }

        document.getElementById(`poolLink${this.selectedPool - 1}`).click();
        this.setSelectedHeroesList();
    }

    checkHeroExists(hero: any): boolean {
        if (this.selectedPoolArray.find(x => x.id === hero.id)) {
            alert('This hero already exists in the selected pool.');
            return true;
        }
        return false;
    }

    setSelectedHero(hero: any): void {
        this.selectedHero = hero;
    }

    highlightPool(pool: number): void {
        document.getElementById(`poolLink${pool - 1}`).style.borderColor = '#a3a3a3';
        document.getElementById(`poolPlusIconCont${pool - 1}`).style.visibility = 'visible';
    }

    unhighlightPool(pool: number): void {
        document.getElementById(`poolLink${pool - 1}`).style.borderColor = 'transparent';
        document.getElementById(`poolPlusIconCont${pool - 1}`).style.visibility = 'hidden';
    }

    resetPools(): void {
        this.selectedHeroesList.forEach((hero) => {
            hero.poolIndexes = [];
        });
        this.pool1 = [];
        this.pool2 = [];
        this.pool3 = [];
        this.pool4 = [];
        this.pool5 = [];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;
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
            $('body').click((event) => {
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
