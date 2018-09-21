import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-hero-item',
    template: `
        <div class="hero-item">
            <div class="removable-hero" (click)="removeHero(currentHero, selectedPool)"></div>
        </div>`,
})
export class HeroItemStubComponent {
    @Input('hero') hero: any;
    @Input('pool') pool: any;
    @Input('isHover') isHover: boolean;
    @Input('isSelectedHero') isSelectedHero: boolean;
    @Output() removeHeroEmitter = new EventEmitter<any>();

    currentHero: any;
    selectedPool: number;
    defaultHero = {
        id: 1,
        programName: 'antimage',
        niceName: 'Anti-Mage',
        roles: 'Carry - Escape - Nuker',
        createdAt: '2018-07-19T18:50:42.000Z',
        updatedAt: '2018-07-19T18:50:42.000Z',
        heroStats: {
            id: 1,
            primaryAttribute: 'agi',
            ability_q: 'Mana Break',
            ability_w: 'Blink',
            ability_e: 'Spell Shield',
            ability_r: 'Mana Void',
            moveSpeed: 310,
            armor: 2.08,
            attackDamageMin: 29,
            attackDamageMax: 33,
            attackRate: null,
            attackRange: null,
            baseStrength: 23,
            baseStrengthGain: 1.3,
            baseAgility: 22,
            baseAgilityGain: 2.8,
            baseIntelligence: 12,
            baseIntelligenceGain: 1.8,
            heroId: 1,
            createdAt: '2018-07-19T18:53:35.000Z',
            updatedAt: '2018-07-19T18:53:35.000Z',
        },
        url: '/static/heroes/images/antimage.png',
        primaryAttribute: 'agi',
        ability_q: 'Mana Break',
        ability_w: 'Blink',
        ability_e: 'Spell Shield',
        ability_r: 'Mana Void',
        moveSpeed: 310,
        armor: 2.08,
        attackDamageMin: 29,
        attackDamageMax: 33,
        attackRate: null,
        attackRange: null,
        baseStrength: 23,
        baseStrengthGain: 1.3,
        baseAgility: 22,
        baseAgilityGain: 2.8,
        baseIntelligence: 12,
        baseIntelligenceGain: 1.8,
        url_q: '/static/abilities/images/antimage_q.png',
        url_w: '/static/abilities/images/antimage_w.png',
        url_e: '/static/abilities/images/antimage_e.png',
        url_r: '/static/abilities/images/antimage_r.png',
    };

    ngOnInit() {
        this.currentHero = this.defaultHero;
        this.selectedPool = 0;
    }

    removeHero(hero: any, pool: any) {
        const emitObject = {
            hero,
            pool,
        };
        this.removeHeroEmitter.emit(emitObject);
    }
}
