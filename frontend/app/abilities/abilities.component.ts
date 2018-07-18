import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-abilities',
    templateUrl: './abilities.component.html',
    styleUrls: ['./abilities.component.scss']
})

export class AbilitiesComponent implements OnInit {

    numberOfPools: any;
    selectedPool: number;
    selectedPoolArray: any;
    abilityPrioArray: any;
    abilities: any;
    abilityToLevelArray: any;

    // Temporary test data
    tempTestData = [
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

    constructor() { }

    // hero category objects
    strengthHeroes = [];
    agilityHeroes = [];
    intelligenceHeroes = [];

    pool1 = [];
    pool2 = [];
    pool3 = [];
    pool4 = [];
    pool5 = [];

    ngOnInit() {
        this.numberOfPools = [1, 2, 3, 4, 5];
        this.selectedPool = 1;
        this.selectedPoolArray = this.pool1;
        this.getHeroes();
        console.log(this.abilityPrioArray);
        this.initAbilityPrioArray();
        this.abilityToLevelArray = [];
        for(let i = 0; i < 25; i += 1) {
            this.abilityToLevelArray.push('n');
        }
        console.log(this.abilityToLevelArray);
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
        this.tempTestData.forEach((hero) => {
            if (hero.class === 'Strength') {
                this.strengthHeroes.push(hero);
            } else if (hero.class === 'Agility') {
                this.agilityHeroes.push(hero);
            } else if (hero.class === 'Intelligence') {
                this.intelligenceHeroes.push(hero);
            }
        });
    }

    // To Do: get API to gather data
    initAbilityPrioArray() {
        this.abilityPrioArray = [
            {
                name: 'Borrowed Time',
                type: 'R',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/7/78/Borrowed_Time_icon.png?version=849b71406c8c433ebb4f077b1516cd2b',
                priority: 0,
            },
            {
                name: 'Talent',
                type: 'T',
                src: 'https://image.winudf.com/v2/image/Y29tLnRyZW5jaHdhcmZhcmVkb3RhLnRhbGVudHRyZWVmb3Jkb3RhX2ljb25fNTgyZ2hqbzg/icon.png?w=170&fakeurl=1&type=.png',
                priority: 1,
            },
            {
                name: 'Mist Coil',
                type: 'Q',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/c/ce/Mist_Coil_icon.png?version=32a1cebecf57f997259c1f5e12439d72',
                priority: 2,
            },
            {
                name: 'Aphotic Shield',
                type: 'W',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/b/b1/Aphotic_Shield_icon.png?version=336e58ce29e348dcc15084c630562a9e',
                priority: 3,
            },
            {
                name: 'Curse of Avernus',
                type: 'E',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/d2/Curse_of_Avernus_icon.png?version=8db283662c09832ae9c22806cce00436',
                priority: 4,
            },
        ];
        this.abilities = this.abilityPrioArray;
    }


    prioritize(type, direction): void {
        console.log('yay');
        console.log(type);

        console.log('before');
        console.log(this.abilityPrioArray);
        for (var i = 0; i < this.abilityPrioArray.length; i += 1) {
            let ability = this.abilityPrioArray[i]
            if (ability.type === type) {

                let prevIndex, temp;

                const oldPriority = ability.priority;
                const newPriority = ability.priority - direction;
                if(0 <= newPriority && newPriority <= 4) {
                    const swapAbility = this.abilityPrioArray.find(
                       testAbility => testAbility.priority == newPriority
                    );
                    ability.priority = newPriority;
                    swapAbility.priority = oldPriority;
                }
                break;
            }
        }
        const newAbilities = [];
        this.abilityPrioArray.map(ability => newAbilities[ability.priority] = ability);
        this.abilities = newAbilities;

        console.log('After');
        console.log(this.abilityPrioArray);
    }

    getLevelOfAbility(type):number {
        let count = 0;
        for(let i = 0; i < this.abilityToLevelArray.length; i += 1) {
            if (this.abilityToLevelArray[i] === type) {
                count++;
            }
        }
        return count;
    }

    getLevelOfAbilityLimted(type, limitIndex):number {
        let count = 0;
        for(let i = 0; i < limitIndex; i += 1) {
            if (this.abilityToLevelArray[i] === type) {
                count++;
            }
        }
        return count;
    }

    // assuming normal hero i.e. not invoker
    canLevelAbility(type, level):boolean {
        const abilityLevel = this.getLevelOfAbilityLimted(type, level-1);
        if (type === 'R') {
            // only allowed to max ult if 
            // 6 * ability level + 6 < level
            // Example
            // lvl 2 and r level 0 => 6 <= 2 which is false hence cannot upgrade
            // lvl 6 and r level 0 => 6 <= 6 which is true hence can upgrade
            // lvl 8 and r level 0 => 0*6 + 6 <= 8 which is true hence can upgrade
            // lvl 8 and r level 1 => 1*6 + 6 <= 8 which is false hence cannot upgrade
            // lvl 18 and r level 2 => 2*6 + 6 <= 18 which is false hence cannot upgrade
            // console.log()
            return abilityLevel < 3 && (6 * abilityLevel + 6) <= level;
        }
        if (type === 'T') {
            // only allowed to level talent if 
            // 5 * ability level + 10 < level
            // Example
            // lvl 2 and t level 1 => 10 <= 2 which is false hence cannot upgrade
            // lvl 10 and t level 0 => 10 <= 10 which is true hence can upgrade
            // lvl 12 and t level 0 => 0*5 + 10 <= 12 which is true hence can upgrade
            // lvl 11 and t level 1 => 1*5 + 10 <= 11 which is false hence cannot upgrade
            // lvl 18 and t level 2 => 2*6 + 6 <= 18 which is false hence cannot upgrade
            return abilityLevel < 4 && (5 * abilityLevel + 10) <= level;
        }
        // the general case for basic abilities
        // Example
        // lvl 1 q level 0 => 0 < 2 which is true hence can upgrade
        // lvl 2 q level 1 => 2*1 < 2 which is false hence cannot upgrade
        // lvl 3 q level 1 => 2*1 < 3 which is true hence can upgrade
        // lvl 4 q level 2 => 2*2 < 4 which is false hence cannot upgrade
        // lvl 5 q level 2 => 2*2 < 5 which is true hence can upgrade
        return abilityLevel < 4 && abilityLevel * 2 < level;
    }



    createArrayFromPrios():void {
        console.log('this.abilityToLevelArray');
        console.log(this.abilityToLevelArray);
        for(let i = 0; i < this.abilityToLevelArray.length; i += 1) {
            for(let j = 0; j < this.abilityPrioArray.length; j += 1) {
                const ability = this.abilities[j];
                if (this.canLevelAbility(ability.type, i + 1)) {
                    this.abilityToLevelArray[i] = ability.type;
                    break;
                }
            }
        }
        console.log('this.abilityToLevelArray after');
        console.log(this.abilityToLevelArray);
    }

    overwritePrio(level, abilityType):void {
        console.log(level);
        console.log(abilityType);
        if (this.canLevelAbility(abilityType, level)) {
            console.log('overwriting..');
            this.abilityToLevelArray[level-1] = abilityType;
        }
        else {
            alert(`cannot get ${abilityType} at this level`);
            console.log("BITCH");
        }
        console.log("Please");
    }

}
