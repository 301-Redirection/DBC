import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  imports: [
    CommonModule,
    NavbarModule
  ],
  declarations: [
    HomeComponent    
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
