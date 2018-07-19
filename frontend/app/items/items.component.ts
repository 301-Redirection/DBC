import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';

// Import JQuery
declare var $: any;
@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})

export class ItemsComponent implements OnInit {
    // Variables
    selectedItemsArray = [];
    allItems: any;
    basicItems = [];
    upgradeItems = [];
    recipes = [];
    recipeIconURL = '../../assets/images/recipe-icon.png';
    dotaGoldIconURL = '../../assets/images/dota-gold-icon.png';
    heroItemSelection = [];
    selectedHeroIndex: number;
    prevSelectedHeroIndex: number;

    // Temporary test data
    selectedHeroes = [
        {
            name: 'Axe',
            class: 'Strength',
        },
        {
            name: 'Sven',
            class: 'Strength',
        },
        {
            name: 'Viper',
            class: 'Agility',
        },
        {
            name: 'Sniper',
            class: 'Agility',
        },
        {
            name: 'Lina',
            class: 'Intelligence',
        },
        {
            name: 'Chen',
            class: 'Intelligence',
        },
    ];

    basicItem = [
        {
            name: 'Town Portal Scroll',
        },
        {
            name: 'Ring of Protection',
        },
        {
            name: 'Iron Branch',
        },
    ];

    optionsSource: SortablejsOptions = {
        group: {
            name: 'clone-group',
            pull: 'clone',
            put: false,
        },
    };

    optionsTarget: SortablejsOptions = {
        group: 'clone-group',
    };

    constructor(private api: ApiConnectService) {}

    ngOnInit() {
        this.getHeroes();
        this.getItems();
    }

    getHeroes() {
        // TODO use hero service
        this.selectedHeroIndex = 0;
        this.prevSelectedHeroIndex = 0;
        for (let hero of this.selectedHeroes) {
            this.heroItemSelection.push([]);
        }
    }

    getItems(): void {
        // database call to retrieve all dota items
        this.api.getAllItems().subscribe((data) => {
            this.allItems = data['items'];
            this.sortItemData();
            this.initPopovers();
        });
    }

    initPopovers () {
        $( function () {
            $('[data-toggle="popover"]').popover();
        });
    }
    getItemImageFullURL (url): string {
        return this.api.getItemImageURL(url);
    }
    sortItemData(): void {
        for (let item of this.allItems) {
            item['url'] = this.getItemImageFullURL(item['url']);
            if (item['type'] === 0) {
                this.basicItems.push(item);
            }else if (item['name'].indexOf('recipe') === -1) {
                console.log(item);
                this.upgradeItems.push(item);
            }else {
                item['url'] = this.recipeIconURL;
                this.recipes.push(item);
            }
        }
    }
    addItemToList (item) {
        this.heroItemSelection[this.selectedHeroIndex].push(item);
        this.setSelectedItemsArray();
    }

    removeItemFromList (item) {
        const index = this.heroItemSelection[this.selectedHeroIndex].indexOf(item);
        if (index !== -1) {
            this.heroItemSelection[this.selectedHeroIndex].splice(index, 1);
            this.setSelectedItemsArray();
        }
    }
    setSelectedHero (index) {
        this.prevSelectedHeroIndex = this.selectedHeroIndex;
        this.selectedHeroIndex = index;
        this.selectedItemsArray = this.heroItemSelection[index];
        $(`#${this.prevSelectedHeroIndex}`).removeClass('hero-selected');
        $(`#${this.selectedHeroIndex}`).addClass('hero-selected');
    }
    reset () : void {
        this.setSelectedHero(0);
        this.heroItemSelection = [];
        for (let hero of this.selectedHeroes) {
            this.heroItemSelection.push([]);
        }
        this.setSelectedItemsArray();
    }

    setSelectedItemsArray () {
        this.selectedItemsArray = this.heroItemSelection[this.selectedHeroIndex];
    }
    clearItemsSelectedHero () {
        this.heroItemSelection[this.selectedHeroIndex] = [];
        this.setSelectedItemsArray();
    }
}
