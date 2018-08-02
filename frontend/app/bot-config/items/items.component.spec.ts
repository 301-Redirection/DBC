import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../../routes/routes.module';
import { SortablejsModule } from 'angular-sortablejs';
import { ItemsComponent } from './items.component';
import { TeamDesiresComponent, ReversePipe } from '../team-desires/team-desires.component';
import { AbilitiesComponent } from '../abilities/abilities.component';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { BotConfigComponent } from '../bot-config.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { CallbackComponent } from '../../callback/callback.component';
import { LoadingComponent } from '../../core/loading.component';
import { NavbarModule } from '../../navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ApiConnectService } from '../../services/api-connect.service';
import { AuthService } from '../../auth/auth.service';
import { HomeModule } from '../../home/home.module';
import { BotManagementModule } from '../../bot-management/bot-management.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import {
    EnumToArrayPipe,
    ConfiguratorComponent,
} from '../team-desires/configurator/configurator.component';
import { MaterialModule } from '../../material/material.module';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ItemsComponent,
                TeamDesiresComponent,
                AbilitiesComponent,
                BotConfigComponent,
                HeroesComponent,
                CallbackComponent,
                LoadingComponent,
                ConfiguratorComponent,
                FilterPipe,
                ReversePipe,
                EnumToArrayPipe,
            ],
            imports: [
                SortablejsModule,
                NavbarModule,
                FormsModule,
                RouterTestingModule.withRoutes(ROUTES),
                HomeModule,
                BotManagementModule,
                DashboardModule,
                MaterialModule,
            ],
            providers: [
                ApiConnectService,
                AuthService,
                HttpClient,
                HttpHandler,
                BotConfigDataService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
