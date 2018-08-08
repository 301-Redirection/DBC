import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../../routes/routes.module';
import { TeamDesiresComponent, ReversePipe } from './team-desires.component';
import { TeamDesiresService } from '../../services/team-desires.service';
import { EnumToArrayPipe } from './configurator/configurator.component';
import { CallbackComponent } from '../../callback/callback.component';
import { LoadingComponent } from '../../core/loading.component';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from '../../../../node_modules/angular-sortablejs/dist';
import { AbilitiesComponent } from '../abilities/abilities.component';
import { BotConfigDataService } from '../../services/bot-config-data.service';
import { BotConfigComponent } from '../bot-config.component';
import { ItemsComponent } from '../items/items.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { NavbarModule } from '../../navbar/navbar.module';
import { ApiConnectService } from '../../services/api-connect.service';
import { AuthService } from '../../auth/auth.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { MaterialModule } from '../../material/material.module';
import { HomeModule } from '../../home/home.module';

@Component({ selector: 'configurator', template: '' })
class ConfiguratorComponent {
    @Input() condition;
}

describe('TeamDesiresComponent', () => {
    let component: TeamDesiresComponent;
    let fixture: ComponentFixture<TeamDesiresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeamDesiresComponent,
                ConfiguratorComponent,
                CallbackComponent,
                LoadingComponent,
                AbilitiesComponent,
                BotConfigComponent,
                ItemsComponent,
                HeroesComponent,
                ReversePipe,
                FilterPipe,
                EnumToArrayPipe,
            ],
            imports: [
                SortablejsModule,
                FormsModule,
                NavbarModule,
                RouterTestingModule.withRoutes(ROUTES),
                MaterialModule,
                HomeModule,
            ],
            providers: [
                ApiConnectService,
                AuthService,
                HttpClient,
                HttpHandler,
                TeamDesiresService,
                BotConfigDataService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamDesiresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

// TODO Add more spec tests
