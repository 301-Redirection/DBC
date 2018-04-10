// General Modules
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Custom Modules
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BotConfigModule } from './bot-config/bot-config.module';
import { NavbarModule } from './navbar/navbar.module';
import { RoutesModule } from './routes/routes.module';
import { BotManagementModule } from './bot-management/bot-management.module';

// Services
import { ApiConnectService } from './services/api-connect.service';

// Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    FormsModule,
    RoutesModule,
    BotManagementModule,
    HomeModule,
    DashboardModule,
    NavbarModule,
    BotConfigModule,
    RouterModule
  ],
  providers: [
    ApiConnectService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
