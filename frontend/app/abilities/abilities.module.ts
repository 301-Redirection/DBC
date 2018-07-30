import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbilitiesComponent } from './abilities.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AbilitiesComponent,
    ],
    exports: [AbilitiesComponent],
})
export class AbilitiesModule { }
