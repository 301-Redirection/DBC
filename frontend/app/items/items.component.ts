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
    numberOfPools: any;
    selectedPool: number;
    selectedPoolArray: any;

    // Temporary test data
    allHeroes = [
        {
            name: 'Axe',
            class: 'Strength',
        }, {
            name: 'Sven',
            class: 'Strength',
        }, {
            name: 'Viper',
            class: 'Agility',
        }, {
            name: 'Sniper',
            class: 'Agility',
        }, {
            name: 'Lina',
            class: 'Intelligence',
        }, {
            name: 'Chen',
            class: 'Intelligence',
        },
    ];

  // hero category objects
    strengthHeroes = [];
    agilityHeroes = [];
    intelligenceHeroes = [];

    pool1 = [];
    pool2 = [];
    pool3 = [];
    pool4 = [];
    pool5 = [];

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

    constructor(private api: ApiConnectService) { }

    ngOnInit() {
        this.numberOfPools = [1, 2, 3, 4, 5];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;
        this.getHeroes();
    }

    getHeroes(): void {
    // database call to retrieve all dota heroes
    // this.api.getAllHeroes().subscribe((data) => {
    //     this.allHeroes = data;
    //     this.sortHeroData();
    // });

        this.sortHeroData();
    }

    sortHeroData(): void {
        this.allHeroes.forEach((hero) => {
            if (hero.class === 'Strength') {
                this.strengthHeroes.push(hero);
            } else if (hero.class === 'Agility') {
                this.agilityHeroes.push(hero);
            } else if (hero.class === 'Intelligence') {
                this.intelligenceHeroes.push(hero);
            }
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
            document.getElementById('poolTabs').style.height = '0';
            document.getElementById('poolTabs').style.visibility = 'hidden';
        } else {
            this.numberOfPools = [1, 2, 3, 4, 5];
            document.getElementById('poolTabs').style.height = '42px';
            document.getElementById('poolTabs').style.visibility = 'visible';
        }
    }

    removeHero(hero, pool): void {
        const index = pool.indexOf(hero);
        if (index !== -1) {
            pool.splice(index, 1);
        }
        document.getElementById(`poolLink${this.selectedPool - 1}`).click();
    }

    resetPools(): void {
        this.pool1 = [];
        this.pool2 = [];
        this.pool3 = [];
        this.pool4 = [];
        this.pool5 = [];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;
    }

}
