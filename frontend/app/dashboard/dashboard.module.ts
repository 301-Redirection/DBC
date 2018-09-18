import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SortablejsModule } from 'angular-sortablejs';
import { LoadingModule } from '../core/loading.module';
@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule,
        SortablejsModule,
        FormsModule,
        LoadingModule,
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
