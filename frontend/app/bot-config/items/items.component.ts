import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { BotConfigDataService } from '../../services/bot-config-data.service';
// Import JQuery
declare var $: any;

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})

export class ItemsComponent implements OnInit{
    // Variables
    allItems: any;
    basicItems = [];
    upgradeItems = [];
    recipes = [];

    // Standard Icons URLS not included in scraper data
    recipeIconURL = '../../assets/images/recipe-icon.png';
    dotaGoldIconURL = '../../assets/images/dota-gold-icon.png';

    // Hero specific variables
    selectedHeroes: any;
    selectedHeroIndex: number;
    prevSelectedHeroIndex: number;
    currentHero: any;

    // Items specific variables
    heroItemSelection = [];
    selectedItem: any;
    selectedItemComponentsArray = [];
    totalCostPerHero = [];
    itemSearch: String;

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
        sort: true,
    };

    constructor(private api: ApiConnectService, private botConfigData: BotConfigDataService) {}

    ngOnInit() {
        this.getHeroes();
        this.getItems();
        this.getSavedSelectedItems();
    }

    // **********************************
    // Get Item and Hero data from server
    // **********************************
    getHeroes() {
        this.botConfigData.getSelectedHeroes().subscribe((heroes) => {
            this.selectedHeroes = [];
            heroes.forEach((hero) => {
                this.selectedHeroes.push(hero);
                this.heroItemSelection.push([]);
                this.totalCostPerHero.push(0);
            });
            this.currentHero = this.selectedHeroes[0];
        });
        this.selectedHeroIndex = 0;
        this.prevSelectedHeroIndex = 0;
    }

    // To be used to retrieve items saved
    getSavedSelectedItems() {
        this.selectedHeroes.forEach((hero, num) => {
            this.botConfigData.getHeroItemSelection(hero.name).subscribe((itemArr) => {
                this.heroItemSelection = itemArr;
                this.totalCostPerHero[num] = this.calculateCostItems(itemArr);
            });
        });
    }

    calculateCostItems (itemArr: any) {
        let cost = 0;
        if (itemArr !== null) {
            itemArr.array.forEach((item) => {
                cost += item.cost;
            });
        }
        return cost;
    }

    getItems(): void {
        // database call to retrieve all dota items
        this.api.getAllItems().subscribe(
            (data) => {
                this.allItems = data['items'];
                this.sortItemData();
            },
            (error) => {
                console.log(error);
            },
        );
    }

    // Get full url path for displaying images
    getItemImageFullURL (url): string {
        return this.api.getItemImageURL(url);
    }
    
    // Categorise the items received from the server
    sortItemData(): void {
        for (const item of this.allItems) {
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

<<<<<<< HEAD
    // Gets upgrade item's components, store in the item
    handleItemComponents (item) {
        item['components'] = JSON.parse(item['components']);
        let component: any;
        if (item.components !== 'null') {
            for (const componentID of item.components) {
                component = this.allItems.find(x => x.id === componentID);
                this.selectedItemComponentsArray.push(component);
            }
            // Sort components according to price
            this.selectedItemComponentsArray.sort((item1, item2) => item1.cost - item2.cost);
            item.components = this.selectedItemComponentsArray;
        }
        this.selectedItemComponentsArray = [];
    }

    // **********************************
    // Functions to handle selected items
    // **********************************

    // Angular ngfor optimization (Dont rebuild list every time)
    trackItem(index, item) {
        // id creates unique identity for each element such that duplicates treated individually
        return `${index}_${item.id}`;
    }
    // Set the selected hero
    onSelect(hero): void {
        this.currentHero = hero;
        this.saveItems();
    }

    // Add item to selected list triggered by double click and drop
=======
>>>>>>> 7287c4a3ff5afd97ce06a1cf1da9711309f03996
    addItemToList (item) {
    // Stop Adding duplicates if dragged in selected items list:
        if (this.selectedItem !== null) {
            if (item.components !== 'null') {
                this.checkItemComponentsExistInList(item);
            }
            this.heroItemSelection[this.selectedHeroIndex].push(item);
            this.totalCostPerHero[this.selectedHeroIndex] += item.cost;
            this.setSelectedItem(null);
        }
    }

    // Absorb items that make up components for an upgrade
    checkItemComponentsExistInList (item) {
        for (const component of item.components) {
            const index = this.heroItemSelection[this.selectedHeroIndex].indexOf(component);
            // Absorb item if in list
            if (index > -1) {
                this.removeItemFromList(component);
            }
        }
    }

    // Remove an item that is in selected list
    removeItemFromList (item) {
        const index = this.heroItemSelection[this.selectedHeroIndex].indexOf(item);
        if (index !== -1) {
            this.heroItemSelection[this.selectedHeroIndex].splice(index, 1);
            this.totalCostPerHero[this.selectedHeroIndex] -= item.cost;
        }
    }

<<<<<<< HEAD
    // Set the selected hero, needed to manage per hero items selection
=======
>>>>>>> 7287c4a3ff5afd97ce06a1cf1da9711309f03996
    setSelectedHero (index) {
        this.prevSelectedHeroIndex = this.selectedHeroIndex;
        this.selectedHeroIndex = index;
        $(`#${this.prevSelectedHeroIndex}`).removeClass('hero-selected');
        $(`#${this.selectedHeroIndex}`).addClass('hero-selected');
    }

<<<<<<< HEAD
    // Set selected item, needed to insert items into selected list
    setSelectedItem (item) {
        this.selectedItem = item;
    }

    // General reset all selected items of all selected heroes to null
=======
>>>>>>> 7287c4a3ff5afd97ce06a1cf1da9711309f03996
    reset () : void {
        this.setSelectedHero(0);
        this.heroItemSelection = [];
        for (let i = 0; i < this.selectedHeroes.length; i += 1) {
            this.heroItemSelection.push([]);
            this.totalCostPerHero[i] = 0;
        }
    }

    // Clear items selected for a specific hero
    clearItemsSelectedHero () {
        this.heroItemSelection[this.selectedHeroIndex] = [];
        this.totalCostPerHero[this.selectedHeroIndex] = 0;
    }

    // *********************************************************
    // Functions to save and retrieve selected items from server
    // *********************************************************

    // Save items to bot config service
    saveItems(): void {
        for (let i = 0; i < this.selectedHeroes.length; i += 1) {
            const hero = this.selectedHeroes[i];
            const itemsArr = this.heroItemSelection[i];
            this.botConfigData.updateHeroItems(hero.programName, itemsArr);
        }
        console.log(this.botConfigData.getConfig());
    }

    // ****************************
    // Functions to handle popovers
    // ****************************
    triggerItemPopover(target: HTMLElement, item: any) {
        $(target).popover({
            animation: true,
            trigger: 'hover',
            placement: 'right',
            html: true,
            content: $(`#${item.name}`).html(),
            template: $('#itemsPopoverTemplate').html(),
        });
        $(target).popover('toggle');
    }

    triggerHeroPopover(target: HTMLElement, hero: any) {
        $(target).popover({
            animation: true,
            trigger: 'hover',
            placement: 'right',
            html: true,
            content: $(`#${hero.programName}`).html(),
            template: $('#heroesPopoverTemplate').html(),
        });
    }
    hideItemPopovers() {
        $('.popover-zone').popover('hide');
    }
}
