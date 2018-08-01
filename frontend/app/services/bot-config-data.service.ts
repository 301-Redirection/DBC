import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

    constructor() { }

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

}
