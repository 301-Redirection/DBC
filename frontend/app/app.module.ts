// General Modules
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Custom Modules
import { HomeModule } from './home/home.module';
import { BotConfigModule } from './bot-config/bot-config.module';
import { NavbarModule } from './navbar/navbar.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RoutesModule } from './routes/routes.module';
import { MaterialModule } from './material/material.module';

// Services
import { ApiConnectService } from './services/api-connect.service';
import { AuthService } from './auth/auth.service';

// Components
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { BotConfigDataService } from './services/bot-config-data.service';
import { WalkthroughComponent } from './walkthrough/walkthrough.component';
import { LoadingModule } from './core/loading.module';

@NgModule({
    declarations: [
        AppComponent,
        CallbackComponent,
        WalkthroughComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RoutesModule,
        HomeModule,
        DashboardModule,
        NavbarModule,
        BotConfigModule,
        RouterModule,
        MaterialModule,
        BrowserAnimationsModule,
        LoadingModule,
    ],
    providers: [
        ApiConnectService,
        Title,
        AuthService,
        BotConfigDataService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
