import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule , FormGroup } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
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
        DashboardComponent,
    ],
    exports: [
        DashboardComponent,
    ],
})
export class DashboardModule { }

export default 'DashboardModule';
