import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '../material/material.module';
import { BotConfigComponent } from './bot-config.component';
import { ConfiguratorComponent, EnumToArrayPipe } from
'./team-desires/configurator/configurator.component';
import { TeamDesiresComponent, ReversePipe } from './team-desires/team-desires.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { ItemsComponent } from './items/items.component';
import { SortablejsModule } from 'angular-sortablejs';
import { FilterPipe } from '../pipes/filter.pipe';
import { BotConfigDataService } from '../services/bot-config-data.service';
import { HeroItemModule } from './hero-item/hero-item.module';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule,
        FormsModule,
        SortablejsModule.forRoot({
            animation: 200,
        }),
        MaterialModule,
        HeroItemModule,
    ],
    declarations: [
        BotConfigComponent,
        EnumToArrayPipe,
        ConfiguratorComponent,
        TeamDesiresComponent,
        HeroesComponent,
        ItemsComponent,
        AbilitiesComponent,
        ReversePipe,
        FilterPipe,
    ],
    exports: [BotConfigComponent],
    providers: [
        BotConfigDataService,
    ],
})
export class BotConfigModule { }
