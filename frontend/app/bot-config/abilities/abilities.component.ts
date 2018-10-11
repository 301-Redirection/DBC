import { Component, OnInit } from '@angular/core';
import * as globalConfig from '../../../../config/config.js';
import { BotConfigDataService } from '../../services/bot-config-data.service';

const NUMBER_TALENTS: number = 4;
const NUMBER_LEVELS: number = 25;
const NUMBER_ABILITIES: number = 5;

// Import JQuery
declare var $: any;

class AbilitySet {
    abilityPriorities: any;
    // 2D array that is displayed
    abilityLevels: any;
    // 0th element highest priority, gets swapped when prio changess
    abilities: any;
}

@Component({
    selector: 'app-abilities',
    templateUrl: './abilities.component.html',
    styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnInit {

    // hero objects
    selectedHeroes: any;
    currentHero: any;

    // state variables
    hasLoaded: any;
    initialized: boolean;

    constructor(private botConfigData: BotConfigDataService) {
        this.hasLoaded = { };
        this.selectedHeroes = [];
        this.initialized = false;
    }

    ngOnInit() {
        this.retrieveHeroes();
    }

    // This is only used by a parent component if this component needs to be reset
    reset(): void {
        this.hasLoaded = { };
        this.selectedHeroes = [];
        this.initialized = false;
        this.retrieveHeroes();
    }

    retrieveHeroes(): void {
        // Retrieving selected heroes from service
        this.botConfigData.getSelectedHeroesObservable().subscribe((heroes) => {
            const newSelectedHeroes = [];
            heroes.forEach((hero) => {
                if (this.hasLoaded.hasOwnProperty(hero.programName) === true) {
                    //console.logconsole.log(`${hero.programName} was loaded already!`);
                    const foundHero = this.selectedHeroes.find((findingHero) => {
                        return findingHero.programName === hero.programName;
                    });
                    if (foundHero) {
                        newSelectedHeroes.push(foundHero);
                        return;
                    }
                }
                this.hasLoaded[hero.programName] = true;
                hero.url = `${globalConfig['app']['API_URL']}${hero.url}`;
                hero.abilitySet = new AbilitySet();
                hero.talents = ['none', 'none', 'none', 'none'];
                this.initAbilityPriority(hero);
                this.getSavedAbilities(hero);
                newSelectedHeroes.push(hero);
            });
            this.selectedHeroes = newSelectedHeroes;
            this.resolveClosedCells(this.selectedHeroes);
            this.currentHero = this.selectedHeroes[0];
            // this.checkIfLoadedSavedScript();
            // if (!this.initialized) {
            //     this.initialized = true;
            // }
            this.saveAbilities();
        });
    }

    // checkIfLoadedSavedScript() {
    //     this.botConfigData.notifyIsLoadedScript().subscribe((isLoadedScript) => {
    //         if (isLoadedScript) {
    //             this.getSavedAbilities();
    //         }
    //     });
    // }

    // To be used to retrieve items saved
    getSavedAbilities(hero) {
        //console.log(hero);
        const savedPriorities = this.botConfigData.getSavedHeroPriorities(hero.programName);
        const abilities = 'QWERT';
        if (savedPriorities) {
            Object.keys(savedPriorities).forEach((x, i) => {
                hero.abilityPriorities[abilities.indexOf(x)].priority = i;
            });
            hero.abilities = savedPriorities;
        }

        const savedLevels = this.botConfigData.getSavedHeroAbilityLevels(hero.programName);
        if (savedLevels) {
            hero.abilityLevels = this.generateAbilitiesFromString(savedLevels);
        }

        const savedTalents = this.botConfigData.getSavedHeroTalents(hero.programName);
        if (savedTalents !== undefined && savedTalents.length > 0) {
            this.regenerateTalentArray(hero, savedTalents);
        }
        if (savedPriorities && savedLevels) {
            hero.abilities = [];
            hero.abilityPriorities.map(ability => hero.abilities[ability.priority] = ability);
        }
    }

    initAbilityPriority(hero) {
        hero.abilityPriorities = [
            {
                name: hero.ability_q,
                type: 'Q',
                src: `${globalConfig['app']['API_URL']}${hero.url_q}`,
                priority: 2,
                index: 0,
            },
            {
                name: hero.ability_w,
                type: 'W',
                src: `${globalConfig['app']['API_URL']}${hero.url_w}`,
                priority: 3,
                index: 1,
            },
            {
                name: hero.ability_e,
                type: 'E',
                src: `${globalConfig['app']['API_URL']}${hero.url_e}`,
                priority: 4,
                index: 2,
            },
            {
                name: hero.ability_r,
                type: 'R',
                src: `${globalConfig['app']['API_URL']}${hero.url_r}`,
                priority: 0,
                index: 3,
            },
            {
                name: 'Talents',
                type: 'T',
                src: 'https://image.winudf.com/v2/image/Y29tLnRyZW5jaHdhcmZhcmVkb3RhLnRhbGV' +
                'udHRyZWVmb3Jkb3RhX2ljb25fNTgyZ2hqbzg/icon.png?w=170&fakeurl=1&type=.png',
                priority: 1,
                index: 4,
            },
        ];
        hero.abilityLevels = [];
        for (let i = 0; i < NUMBER_ABILITIES; i += 1) {
            hero.abilityLevels[i] = [];
            for (let j = 0; j < NUMBER_LEVELS; j += 1) {
                hero.abilityLevels[i].push('open');
            }
        }
        hero.abilities = [];
        hero.abilityPriorities.map(ability => hero.abilities[ability.priority] = ability);
    }

    initAbilityPriorities() {
        this.selectedHeroes.forEach((hero) => {
            this.initAbilityPriority(hero);
        });
    }

    prioritize(type, direction): void {
        this.currentHero.abilityPriorities.forEach((ability) => {
            if (ability.type === type) {
                const oldPriority = ability.priority;
                const newPriority = ability.priority - direction;
                if (0 <= newPriority && newPriority <= 4) {
                    const swapAbility = this.currentHero.abilityPriorities.find(
                       testAbility => testAbility.priority === newPriority,
                    );
                    ability.priority = newPriority;
                    swapAbility.priority = oldPriority;
                }
            }
        });
        const newAbilities = [];
        this.currentHero.abilityPriorities.map(ability => newAbilities[ability.priority] = ability);
        this.currentHero.abilities = newAbilities;
        this.saveAbilities();
    }

    getLevelOfAbility(type, limitIndex: number = NUMBER_LEVELS): number {
        let count = 0;
        const levels = this.currentHero.abilityLevels[this.getNumFromType(type)];
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
        for (let i = 0; i < NUMBER_LEVELS; i += 1) {
            let leveled = false;
            this.currentHero.abilities.forEach((ability) => {
                if (this.canLevelAbility(ability.type, i) && !leveled) {
                    this.currentHero.abilityLevels[ability.index][i] = 'selected';
                    leveled = true;
                } else {
                    this.currentHero.abilityLevels[ability.index][i] = 'open';
                }
            });
        }
        this.createArrayFromSelected();
        this.saveAbilities();
    }

    createArrayFromSelected(): void {
        const levelSelected = [];
        for (let i = 0; i < NUMBER_LEVELS; i += 1) {
            let isSelected = false;
            for (let j = 0; j < NUMBER_ABILITIES; j += 1) {
                if (this.currentHero.abilityLevels[j][i] === 'selected') {
                    isSelected = true;
                    break;
                }
            }
            levelSelected.push(isSelected);
        }
        for (let i = 0; i < NUMBER_LEVELS; i += 1) {
            this.currentHero.abilities.forEach((ability) => {
                const abilityLevels = this.currentHero.abilityLevels[ability.index];
                if (abilityLevels[i] !== 'selected') {
                    if (this.canLevelAbility(ability.type, i)) {
                        if (levelSelected[i]) {
                            abilityLevels[i] = 'closed';
                        } else {
                            abilityLevels[i] = 'open';
                        }
                    } else {
                        abilityLevels[i] = 'disabled';
                    }
                }

            });
        }
    }
    overwritePriorities(level, abilityType): void {
        const abilityLevels = this.currentHero.abilityLevels[this.getNumFromType(abilityType)];
        if (abilityLevels[level] === 'selected') {
            abilityLevels[level] = 'open';
            this.createArrayFromSelected();
        } else if (this.canLevelAbility(abilityType, level)) {
            this.currentHero.abilityLevels.forEach(abilityLevel => abilityLevel[level] = 'open');

            abilityLevels[level] = 'selected';
            for (let i = 0; i < NUMBER_LEVELS; i += 1) {
                if (abilityLevels[i] === 'selected') {
                    // This ability is selected
                    if (!this.canLevelAbility(abilityType, i)) {
                        abilityLevels[i] = 'open';
                    }
                }
            }
            this.createArrayFromSelected();
        } else {
            alert(`Cannot get ${abilityType} at this level.`);
        }
    }

    onSelect(hero): void {
        this.currentHero = hero;
        this.saveAbilities();
    }

    onTalentSelect(level, value) {
        // note that talents[0] referes to the last talent (i.e at lvl 25)
        this.currentHero.talents[level] = value;
        this.saveAbilities();
    }

    getAbilityType(hero, i): string {
        if (hero.abilityPriorities[i].type) {
            return hero.abilityPriorities[i].type.toLowerCase();
        }
        return 'n';
    }

    /** returns string of order of abilities for the current hero
    *    in the form 'qweeqnnnrnnntqwr'
    **/
    generateAbilitiesString(hero): any {
        if (hero === undefined) {
            return '';
        }
        const selectedAbilities = Array.apply(null, Array(NUMBER_LEVELS)).map(( ) => 'n');

        for (let i = 0; i < NUMBER_ABILITIES; i += 1) {
            for (let j = 0; j < NUMBER_LEVELS; j += 1) {
                if (hero.abilityLevels[i][j] === 'selected') {
                    selectedAbilities[j] = this.getAbilityType(hero, i);
                }
            }
        }
        let str = '';
        selectedAbilities.forEach(abilityType => str += abilityType);
        return this.correctAbilitiesString(str);
    }

    // ensures string is length 25 by cropping or padding 'n'
    correctAbilitiesString(str: string): any {
        let newStr = str;
        if (str.length > NUMBER_LEVELS) {
            newStr = str.substring(0, NUMBER_LEVELS);
        } else if (str.length < NUMBER_LEVELS) {
            newStr = str.padEnd(NUMBER_LEVELS, 'n');
        }
        return newStr;
    }

    generateAbilitiesFromString(abilities: String) {
        if (!abilities) {
            return [];
        }
        // console.log('WTF!!');
        // console.log(abilities);
        // Arrays: [0] => q, [1] => w, [2] => e, [3] => r, [4] => t
        const selectedAbilities = [[], [], [], [], []];
        const abilityOrder = ['q', 'w', 'e', 'r', 't'];

        for (let i = 0; i < NUMBER_ABILITIES; i += 1) {
            for (let j = 0; j < NUMBER_LEVELS; j += 1) {
                const abilityValue = abilities.substring(j, j + 1);
                if (abilityValue === abilityOrder[i]) {
                    selectedAbilities[i][j] = 'selected';
                } else {
                    selectedAbilities[i][j] = 'closed';
                }
            }
        }

        return selectedAbilities;
    }

    // 'Clicks' on a selected cell to resolve the difference between closed and disabled
    resolveClosedCells(heroes: any) {
        heroes.forEach((hero) => {
            this.onSelect(hero);
            this.createArrayFromSelected();
        });
        this.currentHero = this.selectedHeroes[0];
    }

    generateTalentArray(hero): any {
        const talentsArray = Array.apply(null, Array(NUMBER_TALENTS)).map(() => 'n');

        if (hero) {
            for (let i = 0; i < NUMBER_TALENTS; i += 1) {
                if (hero.talents[i].toLowerCase() === 'left') {
                    talentsArray[NUMBER_TALENTS - (i + 1)] = 'l';
                } else if (hero.talents[i].toLowerCase() === 'right') {
                    talentsArray[NUMBER_TALENTS - (i + 1)] = 'r';
                } else {
                    talentsArray[NUMBER_TALENTS - (i + 1)] = 'n';
                }
            }
        }
        return talentsArray;
    }

    regenerateTalentArray(hero, talentsArray): any {
        if (hero) {
            for (let i = 0; i < NUMBER_TALENTS; i += 1) {
                if (talentsArray[NUMBER_TALENTS - (i + 1)] === 'l') {
                    hero.talents[i] = 'left';
                } else if (talentsArray[NUMBER_TALENTS - (i + 1)] === 'r') {
                    hero.talents[i] = 'right';
                } else {
                    hero.talents[i] = 'n';
                }
            }
        }
    }

    // saves the heroes' builds to the service/config object
    saveAbilities(): void {
        this.selectedHeroes.forEach((hero) => {
            if (hero) {
                const selectedAbilities = this.generateAbilitiesString(hero);
                const talentsArray = this.generateTalentArray(hero);
                this.botConfigData.updateHeroAbilities(hero.programName, hero.abilities);
                this.botConfigData.updateHeroAbilityLevels(hero.programName, selectedAbilities);
                this.botConfigData.updateHeroTalents(hero.programName, talentsArray);
            }
        });
    }

    triggerPopover(target: HTMLElement, ability: any) {
        $(target).popover({
            animation: true,
            trigger: 'hover',
            placement: 'right',
            html: true,
            template: $('#abilitiesPopoverTemplate').html(),
            content: `<div class = "h5">${ability.name}</div>`,
        });
        $(target).popover('toggle');
    }
}
