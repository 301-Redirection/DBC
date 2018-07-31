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
import { TeamDesiresService } from '../services/team-desires.service';
import { HeroesComponent } from './heroes/heroes.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { SortablejsModule } from 'angular-sortablejs';
import { FilterPipe } from '../pipes/filter.pipe';

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
    ],
    declarations: [
        BotConfigComponent,
        EnumToArrayPipe,
        ConfiguratorComponent,
        TeamDesiresComponent,
        HeroesComponent,
        AbilitiesComponent,
        ReversePipe,
        FilterPipe,
    ],
    exports: [BotConfigComponent],
    providers: [TeamDesiresService],
})
export class BotConfigModule { }
