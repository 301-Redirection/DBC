import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// Import JQuery
declare var $: any;

@Component({
    selector: 'app-hero-item',
    templateUrl: './hero-item.component.html',
    styleUrls: ['./hero-item.component.scss'],
})
export class HeroItemComponent implements OnInit {

    @Input('hero') hero: any;
    @Input('pool') pool: any;
    @Input('isSelectedHero') isSelectedHero: boolean;
    @Input('isAbilityHero') isAbilityHero: boolean;
    @Input('isItemHero') isItemHero: boolean;
    @Output() removeHeroEmitter = new EventEmitter<any>();

    // attribute urls
    strURL = '/assets/images/strength.png';
    agiURL = '/assets/images/agility.png';
    intURL = '/assets/images/intelligence.png';


    constructor() { }

    ngOnInit() { }

    activatePopover() {
        // Differentiate between a selected hero and a non-selected hero
        let id = '';
        if (this.isSelectedHero) {
            id = `#select${this.hero.id}`;
        } else if (this.isAbilityHero) {
            id = `#ability${this.hero.id}`;
        } else if (this.isItemHero) {
            id = `#item${this.hero.id}`;
        } else {
            id = `#${this.hero.id}`;
        }

        $(id).popover({
            animation: true,
            placement: 'right',
            html: true,
            content: $(`#${this.hero.programName}`).html(),
            template: $('#heroesPopoverTemplate').html(),
            trigger: 'focus',
        });
    }

    removeHero(hero: any, pool: any) {
        const emitObject = {
            hero,
            pool,
        };
        this.removeHeroEmitter.emit(emitObject);
    }
}
