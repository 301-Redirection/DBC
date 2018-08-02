import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BotConfigComponent } from '../bot-config/bot-config.component';
import { BotManagementComponent } from '../bot-management/bot-management.component';
import { CallbackComponent } from '../callback/callback.component';
import { TeamDesiresComponent } from '../bot-config/team-desires/team-desires.component';
import { AuthGuard } from '../auth/auth.guard';
import { HeroesComponent } from '../bot-config/heroes/heroes.component';
import { ItemsComponent } from '../bot-config/items/items.component';
import { AbilitiesComponent } from '../bot-config/abilities/abilities.component';

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
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
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
        path: 'bot-management',
        component: BotManagementComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'desires',
        component: TeamDesiresComponent,
        pathMatch: 'full',
    },
    {
        path: 'callback',
        component: CallbackComponent,
    },
    {
        path: 'heroes',
        component: HeroesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'items',
        component: ItemsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class RoutesModule { }
