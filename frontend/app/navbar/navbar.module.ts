import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'angular-sortablejs';

import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SortablejsModule,
    ],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})
export class NavbarModule { }

export default 'NavbarModule';
