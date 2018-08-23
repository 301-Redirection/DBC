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
    selectedItemsArray: any;
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

        // this.popoverDismiss();
    }

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

    getItems(): void {
        // database call to retrieve all dota items
        this.api.getAllItems().subscribe(
            (data) => {
                this.allItems = data['items'];
                this.sortItemData();
                this.selectedItemsArray = [];
            },
            (error) => {
                console.log(error);
            },
        );
    }
    getItemImageFullURL (url): string {
        return this.api.getItemImageURL(url);
    }
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
    addItemToList (item) {
        if (item.components !== 'null') {
            this.checkItemComponentsExistInList(item);
        }
        this.heroItemSelection[this.selectedHeroIndex].push(item);
        this.totalCostPerHero[this.selectedHeroIndex] += item.cost;
        this.setSelectedItemsArray();
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
        let i: number;
        for (i = 0; i < this.selectedHeroes.length; i += 1) {
            this.heroItemSelection.push([]);
            this.totalCostPerHero[i] = 0;
            i += 1;
        }
        this.setSelectedItemsArray();
    }

    setSelectedItem (item) {
        this.selectedItem = item;
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
        // Stop Adding duplicates if drag in selected items list:
        if (this.selectedItem !== null) {
            // Absorb items for on drop
            if (this.selectedItem.components !== 'null') {
                this.checkItemComponentsExistInList(this.selectedItem);
            }
            this.setSelectedItemsArray();
            this.totalCostPerHero[this.selectedHeroIndex] += this.selectedItem.cost;
            this.setSelectedItem(null);
        }
    }

    handleItemComponents (item) {
        item['components'] = JSON.parse(item['components']);
        let component: any;
        if (item.components !== 'null') {
            for (const componentID of item.components) {
                component = this.allItems.find(x => x.id === componentID);
                this.selectedItemComponentsArray.push(component);
                item.components = this.selectedItemComponentsArray;
            }
        }
        this.selectedItemComponentsArray = [];
    }

    getItemNames(items): any {
        const itemNames = [];
        items.forEach((item) => {
            itemNames.push(item.name);
        });
        return itemNames;
    }

    saveItems(): void {
        for (let i = 0; i < this.selectedHeroes.length; i += 1) {
            const hero = this.selectedHeroes[i];
            const items = this.heroItemSelection[i];
            const itemNames = this.getItemNames(items);
            this.botConfigData.updateHeroItems(hero.programName, itemNames);
        }
        console.log(this.botConfigData.getConfig());
    }

    onSelect(hero): void {
        this.currentHero = hero;
        this.saveItems();
    }
    triggerItemPopover(target: HTMLElement, item: any) {
        $(target).popover({
            animation: true,
            trigger: 'hover click',
            placement: 'right',
            html: true,
            content: $(`#${item.name}`).html(),
            template: $('#itemsPopoverTemplate').html(),
        });
    }

    triggerHeroPopover(target: HTMLElement, hero: any) {
        $(target).popover({
            animation: true,
            trigger: 'hover click',
            placement: 'right',
            html: true,
            content: $(`#${hero.programName}`).html(),
            template: $('#heroesPopoverTemplate').html(),
        });
    }
}
