import { Component, OnInit, Input } from '@angular/core';

// Import JQuery
declare var $: any;

@Component({
    selector: 'app-hero-item',
    templateUrl: './hero-item.component.html',
    styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit {

    @Input('hero') hero: any;

    // attribute urls
    strURL = '/assets/images/strength.png';
    agiURL = '/assets/images/agility.png';
    intURL = '/assets/images/intelligence.png';


    constructor() { }

    ngOnInit() { 
        // this.popover();
    }

    popover() {
        $(document).ready(function() {
            $('.popover-dismiss').popover({
                trigger: 'click hover'
            });
        });
    }

}
