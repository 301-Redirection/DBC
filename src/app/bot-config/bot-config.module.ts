import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarModule } from '../navbar/navbar.module';

import { BotConfigComponent } from './bot-config.component';


@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule
  ],
  declarations: [
    BotConfigComponent
  ],
  exports: [BotConfigComponent]
})
export class BotConfigModule { }
