import { Directive, Input, NgModule } from '@angular/core';

// export for convenience.
export { RouterLink } from '@angular/router';

/* tslint:disable:directive-class-suffix */
@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@NgModule({
    declarations: [
        RouterLinkDirectiveStub,
    ],
})
export class RouterStubsModule {}
