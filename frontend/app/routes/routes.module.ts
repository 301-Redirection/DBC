import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BotConfigComponent } from '../bot-config/bot-config.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WalkthroughComponent } from '../walkthrough/walkthrough.component';
import { CallbackComponent } from '../callback/callback.component';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'bot-config',
        component: BotConfigComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'bot-config/:botScriptID',
        component: BotConfigComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'walkthrough',
        component: WalkthroughComponent,
        pathMatch: 'full',
    },
    {
        path: 'callback',
        component: CallbackComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class RoutesModule { }
