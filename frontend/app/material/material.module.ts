import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatSliderModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTooltipModule,
    ],
    exports: [
        MatSliderModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTooltipModule,
    ],
})
export class MaterialModule {}
