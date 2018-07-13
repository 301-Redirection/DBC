import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

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

    // Temporary test data
    heroes = [
        'Axe',
        'Viper',
        'Luna',
        'Litch',
        'Bristleback',
    ];
    pool1 = [];
    pool2 = [];
    pool3 = [];
    pool4 = [];
    pool5 = [];

    options: SortablejsOptions = {
        group: 'normal-group',
    };

    constructor() { }

    ngOnInit() {
        this.numberOfPools = [1, 2, 3, 4, 5];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;
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
    }

    togglePools(): void {
        this.pool1 = [];
        this.pool2 = [];
        this.pool3 = [];
        this.pool4 = [];
        this.pool5 = [];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;

        if (this.numberOfPools.length > 1) {
            this.numberOfPools = [1];
        } else {
            this.numberOfPools = [1, 2, 3, 4, 5];
        }
    }

}
