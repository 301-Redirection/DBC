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
    @Input('isHover') isHover: boolean;
    @Input('currentHero') currentHero: any;
    @Input('isSelectedHero') isSelectedHero: boolean;
    @Output() removeHeroEmitter = new EventEmitter<any>();

    // attribute urls
    strURL = '/assets/images/strength.png';
    agiURL = '/assets/images/agility.png';
    intURL = '/assets/images/intelligence.png';

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.activatePopover();
    }

    activatePopover() {
        const selected = this.isSelectedHero ? 'true' : 'false';
        $(`[data-hero-id^="${this.hero.id}"][data-selected^="${selected}"]`).popover({
            animation: true,
            placement: 'right',
            html: true,
            content: $(`#${this.hero.name}`).html(),
            template: $('#heroesPopoverTemplate').html(),
            trigger: this.isHover ? 'hover' : 'focus',
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
