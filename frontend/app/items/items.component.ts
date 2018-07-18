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
        this.getItems();
        
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
            if (item['type'] === 0) {
                console.log(item);
                item['url'] = this.getItemImageFullURL(item['url']);
                this.basicItems.push(item);
            }else {
                this.upgradeItems.push(item);
            }
        }
    }
    addItemToList (item) {
        this.selectedItemsArray.push(item);
    }

    reset () : void {
        this.selectedItemsArray = [];
    }
}
