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
    @Output() removeHeroEmitter = new EventEmitter<any>();

    // attribute urls
    strURL = '/assets/images/strength.png';
    agiURL = '/assets/images/agility.png';
    intURL = '/assets/images/intelligence.png';

    constructor() { }

    ngOnInit() { }

    activatePopover() {
        const selected = this.isSelectedHero ? 'true' : 'false';
        $(`[data-hero-id="${this.hero.id}"][data-hero-id="${selected}"]`).popover({
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
