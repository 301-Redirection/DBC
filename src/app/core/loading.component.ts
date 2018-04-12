import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
        <img src="/assets/images/loading.svg">
    `,
    styles: [`
        :host {
            display: block;
        }
        img {
            padding-top: 20%;
            padding-bottom: 50%;
        }
    `]
})
export class LoadingComponent {
}
