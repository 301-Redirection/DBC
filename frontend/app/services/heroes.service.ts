import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeroesService {
    
    private selectedHeroes = new BehaviorSubject([]);
    currentHeroes = this.selectedHeroes.asObservable();

    constructor() { }

    public setSelectedHeroes(heroes: any): void {
        this.selectedHeroes.next(heroes);
    }
}
