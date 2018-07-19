import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-abilities',
    templateUrl: './abilities.component.html',
    styleUrls: ['./abilities.component.scss'],
})

export class AbilitiesComponent implements OnInit {

    numberOfPools: any;
    selectedPool: number;
    selectedPoolArray: any;
    abilityPriorities: any;
    // 2D array that is displayed
    abilityLevels: any;
    // 0th element highest prio, gets swapped when prio changess
    abilities: any;

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
        console.log(this.abilityPriorities);
        this.initabilityPriorities();
        // console.log(this.abilityToLevelArray);
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
    initabilityPriorities() {
        this.abilityPriorities = [
            {
                name: 'Mist Coil',
                type: 'Q',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/c/ce/Mist_Coil_icon.png?version=32a1cebecf57f997259c1f5e12439d72',
                priority: 2,
                index: 0,
            },
            {
                name: 'Aphotic Shield',
                type: 'W',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/b/b1/Aphotic_Shield_icon.png?version=336e58ce29e348dcc15084c630562a9e',
                priority: 3,
                index: 1,
            },
            {
                name: 'Curse of Avernus',
                type: 'E',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/d2/Curse_of_Avernus_icon.png?version=8db283662c09832ae9c22806cce00436',
                priority: 4,
                index: 2,
            },
            {
                name: 'Borrowed Time',
                type: 'R',
                src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/7/78/Borrowed_Time_icon.png?version=849b71406c8c433ebb4f077b1516cd2b',
                priority: 0,
                index: 3,
            },
            {
                name: 'Talent',
                type: 'T',
                src: 'https://image.winudf.com/v2/image/Y29tLnRyZW5jaHdhcmZhcmVkb3RhLnRhbGVudHRyZWVmb3Jkb3RhX2ljb25fNTgyZ2hqbzg/icon.png?w=170&fakeurl=1&type=.png',
                priority: 1,
                index: 4,
            },
        ];

        this.abilityLevels = [];
        for (let i = 0; i < 5; i += 1) {
            this.abilityLevels[i] = [];
            for (let j = 0; j < 25; j += 1) {
                this.abilityLevels[i].push('open');
            }
        }

        this.abilities = [];
        this.abilityPriorities.map(ability => this.abilities[ability.priority] = ability);
    }


    prioritize(type, direction): void {
        console.log('yay');
        console.log(type);

        console.log('before');
        console.log(this.abilityPriorities);
        for (let i = 0; i < this.abilityPriorities.length; i += 1) {
            const ability = this.abilityPriorities[i];
            if (ability.type === type) {
                const oldPriority = ability.priority;
                const newPriority = ability.priority - direction;
                if (0 <= newPriority && newPriority <= 4) {
                    const swapAbility = this.abilityPriorities.find(
                       testAbility => testAbility.priority === newPriority,
                    );
                    ability.priority = newPriority;
                    swapAbility.priority = oldPriority;
                }
                break;
            }
        }
        const newAbilities = [];
        this.abilityPriorities.map(ability => newAbilities[ability.priority] = ability);
        this.abilities = newAbilities;

        console.log('After');
        console.log(this.abilityPriorities);
    }

    getLevelOfAbility(type, limitIndex: number = 25): number {
        let count = 0;
        const levels = this.abilityLevels[this.getNumFromType(type)];
        for (let i = 0; i < limitIndex; i += 1) {
            if (levels[i] === 'selected') {
                count += 1;
            }
        }
        return count;
    }

    // assuming normal hero i.e. not invoker
    canLevelAbility(type, level): boolean {
        const gameLevel = level + 1;
        const abilityLevel = this.getLevelOfAbility(type, level);
        if (type === 'R') {
            // only allowed to max ult if
            // 6 * ability level + 6 < level
            // Example
            // lvl 2 and r level 0 => 6 <= 2 which is false hence cannot upgrade
            // lvl 6 and r level 0 => 6 <= 6 which is true hence can upgrade
            // lvl 8 and r level 0 => 0*6 + 6 <= 8 which is true hence can upgrade
            // lvl 8 and r level 1 => 1*6 + 6 <= 8 which is false hence cannot upgrade
            // lvl 18 and r level 2 => 2*6 + 6 <= 18 which is false hence cannot upgrade
            return abilityLevel < 3 && (6 * abilityLevel + 6) <= gameLevel;
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
            return abilityLevel < 4 && (5 * abilityLevel + 10) <= gameLevel;
        }
        // the general case for basic abilities
        // Example
        // lvl 1 q level 0 => 0 < 2 which is true hence can upgrade
        // lvl 2 q level 1 => 2*1 < 2 which is false hence cannot upgrade
        // lvl 3 q level 1 => 2*1 < 3 which is true hence can upgrade
        // lvl 4 q level 2 => 2*2 < 4 which is false hence cannot upgrade
        // lvl 5 q level 2 => 2*2 < 5 which is true hence can upgrade
        return abilityLevel < 4 && abilityLevel * 2 < gameLevel;
    }

    getNumFromType(abilityType): number {
        return ['Q', 'W', 'E', 'R', 'T'].indexOf(abilityType);
    }

    createArrayFromPrios(): void {
        console.log('this.abilityToLevelArray');
        console.log(this.abilityLevels[0]);
        for (let i = 0; i < 25; i += 1) {
            let leveled = false;
            for (let j = 0; j < 5; j += 1) {
                const ability = this.abilities[j];
                if (this.canLevelAbility(ability.type, i) && !leveled) {
                    this.abilityLevels[ability.index][i] = 'selected';
                    console.log(`Set ${ability.type} to selected at level ${i}`);
                    // this.abilityToLevelArray[i] = ability.type;
                    leveled = true;
                } else {
                    console.log(`Not leveling ${ability.type} at level ${i} because`);
                    this.abilityLevels[ability.index][i] = 'open';
                }
            }
        }
        console.log('this.abilityToLevelArray after');
        console.log(this.abilityLevels[0]);
        this.createArrayFromSelected();
    }

    createArrayFromSelected(): void {
        const levelSelected = [];
        for (let i = 0; i < 25; i += 1) {
            let isSelected = false;
            for (let j = 0; j < 5; j += 1) {
                if (this.abilityLevels[j][i] === 'selected') {
                    isSelected = true;
                    break;
                }
            }
            levelSelected.push(isSelected);
        }
        for (let i = 0; i < 25; i += 1) {
            const leveled = false;
            for (let j = 0; j < 5; j += 1) {
                const ability = this.abilities[j];
                if (this.abilityLevels[ability.index][i] !== 'selected') {
                    if (this.canLevelAbility(ability.type, i)) {
                        if (levelSelected[i]) {
                            this.abilityLevels[ability.index][i] = 'closed';
                        } else {
                            this.abilityLevels[ability.index][i] = 'open';
                        }
                    } else {
                        this.abilityLevels[ability.index][i] = 'disabled';
                    }
                }
            }
        }
    }
    overwritePriorities(level, abilityType): void {
        console.log(level);
        console.log(abilityType);
        const abilityLevels = this.abilityLevels[this.getNumFromType(abilityType)];
        if (abilityLevels[level] === 'selected') {
            abilityLevels[level] = 'open';
            this.createArrayFromSelected();
        } else if (this.canLevelAbility(abilityType, level)) {
            console.log('overwriting..');
            for (let i = 0; i < 5; i += 1) {
                this.abilityLevels[i][level] = 'open';
            }
            
            abilityLevels[level] = 'selected';
            for (let i = 0; i < 25; i += 1) {
                if (abilityLevels[i] === 'selected') {
                    // This ability is selected
                    if (!this.canLevelAbility(abilityType, i)) {
                        abilityLevels[i] = 'open';
                    }
                }
            }
            this.createArrayFromSelected();
        } else {
            alert(`cannot get ${abilityType} at this level`);
            console.log('BITCH');
        }
        console.log('Please');
    }

}
