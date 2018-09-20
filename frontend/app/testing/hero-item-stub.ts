import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({ selector: 'app-hero-item', template: '<div class="hero-item"></div>' })
export class HeroItemStubComponent {
    @Input('hero') hero: any;
    @Input('pool') pool: any;
    @Input('currentHero') currentHero: any;
    @Input('isHover') isHover: boolean;
    @Input('isSelectedHero') isSelectedHero: boolean;
    @Output() removeHeroEmitter = new EventEmitter<any>();
}
