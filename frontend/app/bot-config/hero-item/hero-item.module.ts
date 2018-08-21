import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroItemComponent } from './hero-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeroItemComponent],
  exports: [HeroItemComponent],
})
export class HeroItemModule { }
