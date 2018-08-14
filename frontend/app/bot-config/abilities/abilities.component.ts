import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../../services/api-connect.service';
import * as globalConfig from '../../../../config/config.js';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { HeroSpecification } from '../../services/ConfigurationFormat';

const NUMBER_TALENTS: number = 4;
const NUMBER_LEVELS: number = 25;
const NUMBER_ABILITIES: number = 5;
const GAMEPEDIA_LINK = 'https://dota2.gamepedia.com/';

// Import JQuery
declare var $: any;

class AbilitySet {
    abilityPriorities: any;
    // 2D array that is displayed
    abilityLevels: any;
    // 0th element highest priority, gets swapped when prio changess
    abilities: any;
}

class TalentSet {
    talents: [string, string, string, string];
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

    constructor(private api: ApiConnectService, private botConfigData: BotConfigDataService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        // Retrieving selected heroes from service
        this.botConfigData.getSelectedHeroes().subscribe((heroes) => {
            this.selectedHeroes = [];
            heroes.forEach((hero) => {
                this.selectedHeroes.push(hero);
            });

            for (let i = 0; i < this.selectedHeroes.length; i += 1) {
                const hero = this.selectedHeroes[i];
                hero.url = `${globalConfig['app']['API_URL']}${hero.url}`;
                hero.abilitySet = new AbilitySet();
                hero.talents = ['none', 'none', 'none', 'none'];
            }

            this.initAbilityPriorities();
            this.currentHero = this.selectedHeroes[0];
        });
    }

    initAbilityPriorities() {
        for (let h = 0; h < this.selectedHeroes.length; h += 1) {
            const hero = this.selectedHeroes[h];
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
    }

    prioritize(type, direction): void {
        for (let i = 0; i < this.currentHero.abilityPriorities.length; i += 1) {
            const ability = this.currentHero.abilityPriorities[i];
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
                break;
            }
        }
        const newAbilities = [];
        this.currentHero.abilityPriorities.map(ability => newAbilities[ability.priority] = ability);
        this.currentHero.abilities = newAbilities;
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
        // console.log('abilities', this.currentHero.abilities);
        for (let i = 0; i < NUMBER_LEVELS; i += 1) {
            let leveled = false;
            for (let j = 0; j < NUMBER_ABILITIES; j += 1) {
                const ability = this.currentHero.abilities[j];
                if (this.canLevelAbility(ability.type, i) && !leveled) {
                    this.currentHero.abilityLevels[ability.index][i] = 'selected';
                    leveled = true;
                } else {
                    this.currentHero.abilityLevels[ability.index][i] = 'open';
                }
            }
        }
        this.createArrayFromSelected();
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
            const leveled = false;
            for (let j = 0; j < NUMBER_ABILITIES; j += 1) {
                const ability = this.currentHero.abilities[j];
                if (this.currentHero.abilityLevels[ability.index][i] !== 'selected') {
                    if (this.canLevelAbility(ability.type, i)) {
                        if (levelSelected[i]) {
                            this.currentHero.abilityLevels[ability.index][i] = 'closed';
                        } else {
                            this.currentHero.abilityLevels[ability.index][i] = 'open';
                        }
                    } else {
                        this.currentHero.abilityLevels[ability.index][i] = 'disabled';
                    }
                }
            }
        }
    }
    overwritePriorities(level, abilityType): void {
        const abilityLevels = this.currentHero.abilityLevels[this.getNumFromType(abilityType)];
        if (abilityLevels[level] === 'selected') {
            abilityLevels[level] = 'open';
            this.createArrayFromSelected();
        } else if (this.canLevelAbility(abilityType, level)) {
            for (let i = 0; i < NUMBER_ABILITIES; i += 1) {
                this.currentHero.abilityLevels[i][level] = 'open';
            }

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
            alert(`cannot get ${abilityType} at this level`);
        }
    }

    onSelect(hero): void {
        this.currentHero = hero;
        this.saveAbilities();
    }

    onTalentSelect(level, value) {
        // note that talents[0] referes to the last talent (i.e at lvl 25)
        this.currentHero.talents[level] = value;
    }

    createHeroSpecification(): void {
        const i = 5;
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
        const selectedAbilities = [];
        for (let i = 0; i < NUMBER_LEVELS; i += 1) {
            selectedAbilities.push('n');
        }
        for (let i = 0; i < NUMBER_ABILITIES; i += 1) {
            for (let j = 0; j < NUMBER_LEVELS; j += 1) {
                if (hero.abilityLevels[i][j] === 'selected') {
                    selectedAbilities[j] = this.getAbilityType(hero, i);
                }
            }
        }
        let str = '';
        selectedAbilities.forEach((abilityType) => {
            str += abilityType;
        });
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

    generateTalentArray(hero): any {
        const talentsArray = [];
        for (let i = 0; i < NUMBER_TALENTS; i += 1) {
            talentsArray.push('n');
        }
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

    constructHeroSpecification(hero): HeroSpecification {
        if (hero) {
            const name = hero.programName;
            const selectedAbilities = this.generateAbilitiesString(hero);
            const talentsArray = this.generateTalentArray(hero);
            return {
                name,
                abilities: {
                    abilities: selectedAbilities,
                    talents: talentsArray,
                },
                items: [],
            };
        }
        return null;
    }

    // saves the heroes' builds to the service/config object
    saveAbilities(): void {
        const heroSpecs: HeroSpecification[] = [];
        this.selectedHeroes.forEach((hero) => {
            if (hero) {
                const current = this.constructHeroSpecification(hero);
                heroSpecs.push(current);
                this.botConfigData.updateHeroAbilities(current.name, current.abilities.abilities);
                this.botConfigData.updateHeroTalents(current.name, current.abilities.talents);
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
    }
}
