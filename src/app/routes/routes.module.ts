import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BotConfigComponent } from '../bot-config/bot-config.component';
import { BotManagementComponent } from '../bot-management/bot-management.component';
import { CallbackComponent } from '../callback/callback.component';
import { AuthGuard } from '../auth/auth.gaurd';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'bot-config', component: BotConfigComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'bot-management', component: BotManagementComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutesModule { }
