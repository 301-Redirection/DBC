import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
    // Variables
    selectedItemsArray = [];

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

    basicItems = [
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
        // database call to retrieve all dota heroes
        // this.api.getAllHeroes().subscribe((data) => {
        //     this.allHeroes = data;
        //     this.sortHeroData();
        // });

        this.sortItemData();
    }

    sortItemData(): void {
        // TODO
        // Sort items
    }

    reset() : void {
        this.selectedItemsArray = [];
    }
}
