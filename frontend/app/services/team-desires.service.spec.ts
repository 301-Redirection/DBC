import { TestBed, inject } from '@angular/core/testing';

import { TeamDesiresService } from './team-desires.service';
import { Router } from '@angular/router';
import { RoutesModule } from '../routes/routes.module';

describe('TeamDesiresService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TeamDesiresService,
                { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
                RoutesModule,
            ],
        });
    });

    it('should be created', inject([TeamDesiresService], (service: TeamDesiresService) => {
        expect(service).toBeTruthy();
    }));
});
