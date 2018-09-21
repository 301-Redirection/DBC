import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        MatSliderModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatInputModule,
    ],
    exports: [
        MatSliderModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatInputModule,
    ],
})
export class MaterialModule {}
