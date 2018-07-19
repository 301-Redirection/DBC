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
    selectedItemComponentsArray = [];
    totalCostPerHero = [];
    selectedItem: any;

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
        sort: false,
    };

    optionsTarget: SortablejsOptions = {
        group: 'clone-group',
        sort: false,
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
            this.totalCostPerHero.push(0);
        }
    }

    getItems(): void {
        // database call to retrieve all dota items
        this.api.getAllItems().subscribe((data) => {
            this.allItems = data['items'];
            this.sortItemData();
            //this.initPopovers();
            this.setSelectedHero(0);
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
                this.handleItemComponents(item);
                this.upgradeItems.push(item);
            }else {
                item['url'] = this.recipeIconURL;
                this.recipes.push(item);
            }
        }
    }
    addItemToList (item) {
        this.heroItemSelection[this.selectedHeroIndex].push(item);
        this.totalCostPerHero[this.selectedHeroIndex] += item.cost;
        this.setSelectedItemsArray();
    }

    removeItemFromList (item) {
        const index = this.heroItemSelection[this.selectedHeroIndex].indexOf(item);
        if (index !== -1) {
            this.totalCostPerHero[this.selectedHeroIndex] -= item.cost;
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
        let index: number;
        index = 0;
        for (let hero of this.selectedHeroes) {
            this.heroItemSelection.push([]);
            this.totalCostPerHero[index] = 0;
            index += 1;
        }
        this.setSelectedItemsArray();
    }

    setSelectedItem (item) {
        this.selectedItem = item;
        console.log(item);
    }

    setSelectedItemsArray () {
        this.selectedItemsArray = this.heroItemSelection[this.selectedHeroIndex];
    }
    clearItemsSelectedHero () {
        this.heroItemSelection[this.selectedHeroIndex] = [];
        this.totalCostPerHero[this.selectedHeroIndex] = 0;
        this.setSelectedItemsArray();
    }
    addItemCostToTotal () {
        this.totalCostPerHero[this.selectedHeroIndex] += this.selectedItem.cost;
        console.log(this.selectedItem.cost);
    }

    handleItemComponents (item) {
        item['components'] = JSON.parse(item['components']);
        let component: any;
        if (item.components !== 'null') {
            for (let componentID of item.components) {
                component = this.allItems.find(x => x.id === componentID);
                this.selectedItemComponentsArray.push(component);
                item.components = this.selectedItemComponentsArray;
            }
        }
        this.selectedItemComponentsArray = [];
    }

    triggerPopover(target: HTMLElement, item: any) {
        console.log(item);
        $(target).popover({
            animation: true,
            placement: 'right',
            html: true,
            content: `
                <h5 style="text-shadow:none;">
                    <img src="${item.url}" height="25">
                    ${item.niceName}
                </h5>
                <hr>
                <h6><b>Cost:</b></h6>
                <h6>
                    <img src="${this.dotaGoldIconURL}">
                    ${item.cost}
                </h6>
            `,
            trigger: 'hover',
        });
    }
}
