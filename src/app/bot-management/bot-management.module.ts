import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarModule } from '../navbar/navbar.module';

import { BotManagementComponent } from './bot-management.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule
  ],
  declarations: [
    BotManagementComponent
  ],
  exports: [BotManagementComponent]
})
export class BotManagementModule { }
