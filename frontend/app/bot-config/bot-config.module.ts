import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { BotConfigComponent } from './bot-config.component';
import { ConfiguratorComponent, EnumToArrayPipe } from
'./team-desires/configurator/configurator.component';
import { TeamDesiresComponent, ReversePipe } from './team-desires/team-desires.component';
import { TeamDesiresService } from '../services/team-desires.service';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        RouterModule,
        FormsModule,
    ],
    declarations: [
        BotConfigComponent,
        EnumToArrayPipe,
        ConfiguratorComponent,
        TeamDesiresComponent,
        ReversePipe,
    ],
    exports: [BotConfigComponent],
    providers: [TeamDesiresService],
})
export class BotConfigModule { }
