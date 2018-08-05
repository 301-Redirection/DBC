import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule , FormGroup } from '@angular/forms';
import { DisplayComponent } from './display.component';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule,
        SortablejsModule,
        FormsModule,
    ],
    declarations: [
        DisplayComponent,
    ],
    exports: [
        DisplayComponent,
    ],
})
export class DisplayModule { }

export default 'DisplayModule';
