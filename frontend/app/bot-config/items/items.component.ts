import { Component, OnInit, HostListener, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ApiConnectService } from '../../services/api-connect.service';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { BehaviorSubject } from 'rxjs';
// Import JQuery
declare var $: any;

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})

export class ItemsComponent implements OnInit{

    @Input('selected') selected: string;

    // Variables
    allItems: any;
    basicItems = [];
    upgradeItems = [];
    recipes = [];
    isAllItemsLoaded = new BehaviorSubject(false);

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

    // Listen for key press to update itemSearch
    @HostListener('document:keydown', ['$event'])
    searchEvent(event: KeyboardEvent) {
        if (this.selected === 'items'
            && event.target['localName'] !== 'input'
            && event.target['localName'] !== 'textarea'
            && event.code.includes('Key')) {
            this.itemSearch += event.key;
        }
    }

    // Listen for escape key to clear search
    @HostListener('document:keydown.escape', ['$event'])
    clearSearch(event: KeyboardEvent) {
        if (this.selected === 'items'
            && event.target['localName'] !== 'input'
            && event.target['localName'] !== 'textarea') {
            this.itemSearch = '';
        }
    }

    constructor(private api: ApiConnectService, private botConfigData: BotConfigDataService) {}

    ngOnInit() {
        this.selectedHeroes = [];
        this.isAllItemsLoaded.next(false);
        this.getItems();
        this.itemSearch = '';
    }

    // **********************************
    // Get Item and Hero data from server
    // **********************************
    getHeroes() {
        this.botConfigData.getSelectedHeroesObservable().subscribe((heroes) => {
            this.selectedHeroes = [];
            heroes.forEach((hero) => {
                this.selectedHeroes.push(hero);
                this.heroItemSelection.push([]);
                this.totalCostPerHero.push(0);
            });
            this.currentHero = this.selectedHeroes[0];
            // this.checkIfLoadedSavedScript();
        });
        this.selectedHeroIndex = 0;
        this.prevSelectedHeroIndex = 0;
    }
    checkIfLoadedSavedScript() {
        this.botConfigData.notifyIsLoadedScript().subscribe((isLoadedScript) => {
            if (isLoadedScript) {
                this.getSavedItems();
            }
        });
    }

    // To be used to retrieve items saved
    getSavedItems() {
        // Wait for all items to load properly to be able to populate correctly
        this.isAllItemsLoaded.subscribe((state) => {
            if (state) {
                this.selectedHeroes = this.botConfigData.getSelectedHeroes();
                if (this.selectedHeroes && this.selectedHeroes.length > 0) {
                    this.selectedHeroes.forEach((hero, num) => {
                        const savedItemsMinimal = this.botConfigData
                            .getHeroItemSelection(hero.programName);
                        const savedItems = this.populateSavedItems(savedItemsMinimal);
                        if (savedItems !== undefined && savedItems.length > 0) {
                            this.heroItemSelection[num] = savedItems;
                            this.totalCostPerHero[num] = this.calculateCostItems(savedItems);
                        } else {
                            this.heroItemSelection[num] = [];
                            this.totalCostPerHero[num] = 0;
                        }
                    });
                }

            }
        });
        return true;
    }

    populateSavedItems(items) {
        const savedItems = [];
        items.forEach((x) => {
            if (x.name.indexOf('item_recipe_') === 0) {
                x.name = x.name.substring(12);
            }
            const newItem = this.allItems.find(item => item.name === x.name);
            if (x && x.components && x.components !== 'null' && x.components.length > 0) {
                newItem.components = this.populateSavedItems(x.components);
            }
            savedItems.push(newItem);
        });
        return savedItems;
    }

    calculateCostItems (itemArr: any) {
        let cost = 0;
        if (itemArr !== undefined && itemArr.length > 0) {
            itemArr.forEach((item) => {
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
                this.isAllItemsLoaded.next(true);
                this.getHeroes();
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
            } else if (item['name'].indexOf('recipe') === -1) {
                this.handleItemComponents(item);
                this.upgradeItems.push(item);
            } else {
                item['url'] = this.recipeIconURL;
                this.recipes.push(item);
            }
        }
    }

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
    addItemToList (item) {
    // Stop Adding duplicates if dragged in selected items list:
        if (this.selectedItem !== null) {
            if (item.components !== 'null') {
                this.checkItemComponentsExistInList(item);
            }
            this.heroItemSelection[this.selectedHeroIndex].push(item);
            this.totalCostPerHero[this.selectedHeroIndex] += item.cost;
            this.setSelectedItem(null);
            this.saveItems();
        }
    }

    // Absorb items that make up components for an upgrade
    checkItemComponentsExistInList (item) {
        for (const component of item.components) {
            const index = this.findIndexOfItem(component);
            // Absorb item if in list
            if (index > -1) {
                this.removeItemFromList(component);
            }
        }
    }

    // Find item based on item ID
    findIndexOfItem (item) {
        for (let i = 0; i < this.heroItemSelection[this.selectedHeroIndex].length; i += 1) {
            if (this.heroItemSelection[this.selectedHeroIndex][i].id === item.id) {
                return i;
            }
        }
        return -1;
    }

    // Remove an item that is in selected list
    removeItemFromList (item) {
        const index = this.findIndexOfItem(item);
        if (index !== -1) {
            this.heroItemSelection[this.selectedHeroIndex].splice(index, 1);
            this.totalCostPerHero[this.selectedHeroIndex] -= item.cost;
        }
    }

    // Set the selected hero, needed to manage per hero items selection
    setSelectedHero (index) {
        this.prevSelectedHeroIndex = this.selectedHeroIndex;
        this.selectedHeroIndex = index;
        $(`#${this.prevSelectedHeroIndex}`).removeClass('hero-selected');
        $(`#${this.selectedHeroIndex}`).addClass('hero-selected');
    }

    // Set selected item, needed to insert items into selected list
    setSelectedItem (item) {
        this.selectedItem = item;
    }

    // General reset all selected items of all selected heroes to null
    reset () : void {
        if (this.selectedHeroes != null) {
            this.setSelectedHero(0);
            this.heroItemSelection = [];
            for (let i = 0; i < this.selectedHeroes.length; i += 1) {
                this.heroItemSelection.push([]);
                this.totalCostPerHero[i] = 0;
            }
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

    hideItemPopovers() {
        $('.popover-zone').popover('hide');
    }
}
