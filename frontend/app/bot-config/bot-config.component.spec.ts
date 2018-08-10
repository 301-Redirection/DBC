import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { BotConfigComponent } from './bot-config.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { SortablejsModule } from 'angular-sortablejs';
import { BotConfigDataService } from '../services/bot-config-data.service';
import { HeroesComponent } from './heroes/heroes.component';
import { DisplayComponent } from '../display/display.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { TeamDesiresComponent, ReversePipe } from './team-desires/team-desires.component';
import { ItemsComponent } from './items/items.component';
import { CallbackComponent } from '../callback/callback.component';
import { LoadingComponent } from '../core/loading.component';
import { AuthService } from '../auth/auth.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { BotConfigModule } from './bot-config.module';
import { HomeModule } from '../home/home.module';
import { AuthGuard } from '../auth/auth.guard';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { EnumToArrayPipe } from './team-desires/configurator/configurator.component';

@Component({ selector: 'configurator', template: '' })
class ConfiguratorComponent {
    @Input() condition;
}

describe('BotConfigComponent', () => {
    let component: BotConfigComponent;
    let fixture: ComponentFixture<BotConfigComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BotConfigComponent,
                HeroesComponent,
                AbilitiesComponent,
                TeamDesiresComponent,
                ItemsComponent,
                CallbackComponent,
                LoadingComponent,
                DisplayComponent,
                ConfiguratorComponent,
                FilterPipe,
                ReversePipe,
                EnumToArrayPipe,
            ],
            imports: [
                RouterTestingModule.withRoutes(ROUTES),
                HttpClientModule,
                HomeModule,
                FormsModule,
                NavbarModule,
                SortablejsModule,
                MaterialModule,
            ],
            providers: [
                FilterPipe,
                AuthService,
                AuthGuard,
                ApiConnectService,
                HttpClient,
                HttpHandler,
                { provide: Title, useClass: Title },
                BotConfigDataService,
            ],
        })
        .compileComponents();

        router = TestBed.get(Router);
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BotConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the title \'Dota 2 Bot Scripting - Configuration\'', async(() => {
        const title = TestBed.get(Title);
        expect(title.getTitle()).toEqual('Dota 2 Bot Scripting - Configuration');
    }));
});
