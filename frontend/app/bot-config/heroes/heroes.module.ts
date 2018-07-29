import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from '../heroes/heroes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    declarations: [
        HeroesComponent,
    ],
    exports: [HeroesComponent],
    providers: [],
})
export class HeroesModule { }
