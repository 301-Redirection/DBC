import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    ConfigurationFormat,
    Condition,
    CompoundCondition,
} from './ConfigurationFormat';

@Injectable()
export class BotConfigDataService {
    // Heroes data
    private selectedHeroes = new BehaviorSubject([]);

    config: ConfigurationFormat;
    private isLoaded = new BehaviorSubject<boolean>(false);

    constructor() {
        this.reset();
    }

    /**************************/
    /*     General Config     */
    /**************************/

    // creates config object according to format
    reset(): void {
        this.config = this.getDefaultConfiguration();
        this.setNotifyLoaded(false);
    }

    public getConfig(): any {
        // this.setNotifyLoaded(false);
        return this.config;
    }

    public setConfig(config: ConfigurationFormat) {
        this.config = config;
        this.setTeamDesires(this.config.desires);
        this.setNotifyLoaded(true);
    }

    // Notification Service
    public setNotifyLoaded(state: boolean) {
        this.isLoaded.next(state);
    }

    public notifyIsLoadedScript(): Observable<any> {
        return this.isLoaded.asObservable();
    }

    public getIsLoaded(): any {
        return this.isLoaded.getValue();
    }

    /**************************/
    /* Team Desires Functions */
    /**************************/

    public getDefaultConfiguration(): ConfigurationFormat {
        return new ConfigurationFormat();
    }

    public newCondition(): Condition {
        return new Condition();
    }

    public newCondGroup(): CompoundCondition {
        return new CompoundCondition();
    }

    // Team desires
    public setTeamDesires(teamDesires: any): void {
        // this.config.desires = this.scaleTeamDesires(teamDesires, true);
        this.config.desires = teamDesires;
    }

    public getTeamDesires(): any {
        // return this.scaleTeamDesires(this.config.desires, false);
        return this.config.desires;
    }

    /**************************/
    /*     Hero Functions     */
    /**************************/

    // creates a hero specification for the hero if non-existent
    // private addHeroToPool(heroName, heroPool): void {
    //     const hero = this.config.heroPool.pool.find(hero => hero.name === heroName);
    //     if (!hero) {
    //         this.config.heroPool.pool.push({ name: heroName, position: heroPool });
    //     }
    // }

    public removeHeroFromPool(heroName, heroPool): void {
        const hero = this.config.heroPool.pool.find((hero) => {
            return hero.name === heroName && hero.position === heroPool;
        });
        if (!hero) {
            throw 'Removed a hero from a pool, but they doesn\'t exist in that pool';
        } else {
            this.config.heroPool.pool.splice(this.config.heroPool.pool.indexOf(hero), 1);
        }
    }

    public setHeroPool(heroPool: any): void {
        this.config.heroPool = heroPool;
    }

    public getHeroPools() {
        return this.config.heroPool;
    }

    public setSelectedHeroes(heroes: any) {
        this.config.heroes = heroes;
        this.selectedHeroes.next(heroes);
    }

    public getSelectedHeroes(): any {
        return this.selectedHeroes.getValue();
    }

    public getSelectedHeroesObservable(): any {
        return this.selectedHeroes.asObservable();
    }

    public getSavedHeroes() {
        return this.config.heroes;
    }

    /**************************/
    /*   Abilities Functions  */
    /**************************/

    public getSavedHeroTalents(heroName: string): any {
        const hero = this.config.heroes.find(hero => hero['name'] === heroName);
        if (hero === undefined) {
            return undefined;
        }
        return hero.talents;
    }

    public getSavedHeroAbilities(heroName: string): any {
        const hero = this.config.heroes.find(hero => hero['name'] === heroName);
        if (hero === undefined) {
            return undefined;
        }
        return hero.abilities;
    }

    public getSavedHeroPriorities(heroName: string): any {
        const hero = this.config.heroes.find(hero => hero['name'] === heroName);
        if (hero === undefined) {
            return undefined;
        }
        return hero.priorities;
    }

    public getSavedHeroAbilityLevels(heroName: string): any {
        const hero = this.config.heroes.find(hero => hero.name === heroName);
        if (hero === undefined) {
            return undefined;
        }

        return hero.abilityLevels;
    }

    public updateHeroTalents(heroName: string, talents: any) {
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.talents = talents;
            }
        });
    }

    public updateHeroAbilityLevels(heroName: string, abilityLevels: any) {
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.abilityLevels = abilityLevels;
            }
        });
    }

    public updateHeroAbilities(heroName: string, abilities: any) {
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.abilities = abilities;
            }
        });
    }

    /**************************/
    /*     Items Functions    */
    /**************************/

    public getHeroItemSelection(heroName: string): any {
        const hero = this.config.heroes.find(hero => hero['name'] === heroName);
        if (hero === undefined) {
            return undefined;
        }
        return hero.items;
    }

    public updateHeroItems(heroName: string, items: any) {
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.items = items;
            }
        });
    }
}
