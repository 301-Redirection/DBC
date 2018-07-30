import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
    imports: [
        CommonModule,
        SortablejsModule,
    ],
    declarations: [
        ItemsComponent,
    ],
    exports: [
        ItemsComponent,
    ],
})
export class ItemsModule { }

export default 'ItemsModule';
