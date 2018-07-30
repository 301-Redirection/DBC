import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
// import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SortablejsModule,
    ],
    declarations: [
        HeroesComponent,
    ],
    exports: [
        HeroesComponent,
    ],
})
export class HeroesModule { }

export default 'HeroesModule';
