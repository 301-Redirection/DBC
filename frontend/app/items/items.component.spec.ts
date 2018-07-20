import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';
import { HomeModule } from '../home/home.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesModule, ROUTES } from '../routes/routes.module';
import { BotConfigModule } from '../bot-config/bot-config.module';
import { BotManagementModule } from '../bot-management/bot-management.module';
import { CallbackComponent } from '../callback/callback.component';
import { LoadingComponent } from '../core/loading.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { AbilitiesComponent } from '../abilities/abilities.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsComponent],
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
