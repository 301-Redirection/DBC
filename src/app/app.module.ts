// General Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Custom Modules
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BotConfigModule } from './bot-config/bot-config.module';
import { NavbarModule } from './navbar/navbar.module';
import { RoutesModule } from './routes/routes.module';

// Services
import { ApiConnectService } from './services/api-connect.service';

// Components
import { AppComponent } from './app.component';
import { BotManagementComponent } from './bot-management/bot-management.component';

@NgModule({
  declarations: [
    AppComponent,
    BotManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutesModule,    
    HomeModule,
    DashboardModule,
    NavbarModule,
    BotConfigModule
  ],
  providers: [ApiConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
