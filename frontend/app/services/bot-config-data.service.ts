import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    ConfigurationFormat,
    HeroSpecification,
    Condition,
    CompoundCondition,
} from './ConfigurationFormat';

@Injectable()
export class BotConfigDataService {
    // Team Desires data
    private teamDesires = new BehaviorSubject([]);
    currentTeamDesires = this.teamDesires.asObservable();

    // Heroes data
    private selectedHeroes = new BehaviorSubject([]);
    currentHeroes = this.selectedHeroes.asObservable();

    // Abilities data
    private abilities = new BehaviorSubject([]);
    currentAbilities = this.abilities.asObservable();

    // Items data
    private items = new BehaviorSubject([]);
    currentItems = this.items.asObservable();

    config: ConfigurationFormat;

    constructor() {
        this.reset();
    }

    // creates config object according to format
    reset(): void {
        this.config = this.getDefaultConfiguration();
    }

    public getDefaultConfiguration(): ConfigurationFormat {
        return new ConfigurationFormat();
    }

    public newCondition(): Condition {
        return new Condition();
    }

    public newCondGroup(): CompoundCondition {
        return new CompoundCondition();
    }

    // creates a hero specification for the hero if non-existent
    private ensureHeroSpecification(heroName): void {
        const heroes = this.config.heroes;
        let exists = false;
        for (let i = 0; i < heroes.length; i += 1) {
            const hero = heroes[i];
            if (hero.name === heroName) {
                exists = true;
            }
        }
        if (!exists) {
            const heroSpec = new HeroSpecification();
            heroSpec.name = heroName;
            heroes.push(heroSpec);
        }
    }

    public updateHeroItems(heroName: string, items: any) {
        this.ensureHeroSpecification(heroName);
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.items = items;
            }
        });
    }

    public updateHeroTalents(heroName: string, talents: any) {
        this.ensureHeroSpecification(heroName);
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.abilities.talents = talents;
            }
        });
    }

    public updateHeroAbilities(heroName: string, abilities: any) {
        this.ensureHeroSpecification(heroName);
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                hero.abilities.abilities = abilities;
            }
        });
    }

    public setHeroSpecification(heroSpecification: any): void {
        this.config.heroes = heroSpecification;
    }

    public setHeroPool(heroPool: any): void {
        this.config.heroPool = heroPool;
    }

    public getConfig(): any {
        return this.config;
    }

    // Team desires
    public setTeamDesires(teamDesires: any): void {
        this.teamDesires.next(teamDesires);
    }

    public getTeamDesires(): any {
        return this.teamDesires;
    }

    // Heroes
    public setSelectedHeroes(heroes: any): void {
        this.selectedHeroes.next(heroes);
    }

    public getSelectedHeroes(): any {
        return this.selectedHeroes;
    }

    // Abilities
    public setAbilities(abilities: any): void {
        this.abilities.next(abilities);
    }

    public getAbilities(): any {
        return this.abilities;
    }

    // Items
    public setItems(items: any): void {
        this.items.next(items);
    }

    public getItems(): any {
        return this.items;
    }

    public getHeroItemSelection(heroName: string): any {
        let itemsArr = [];
        this.config.heroes.forEach((hero) => {
            if (hero.name === heroName) {
                itemsArr = hero.items;
            }
        });
        return itemsArr;
    }

}
