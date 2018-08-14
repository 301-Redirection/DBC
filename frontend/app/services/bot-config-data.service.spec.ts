import { TestBed, inject } from '@angular/core/testing';

import { BotConfigDataService } from './bot-config-data.service';
import { Router } from '@angular/router';
import { RoutesModule } from '../routes/routes.module';

describe('BotConfigDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BotConfigDataService,
                { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
                RoutesModule,
            ],
        });
    });

    it('should be created', inject([BotConfigDataService], (service: BotConfigDataService) => {
        expect(service).toBeTruthy();
    }));
});
