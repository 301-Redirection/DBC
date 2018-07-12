import { TestBed, inject } from '@angular/core/testing';

import { TeamDesiresService } from './team-desires.service';

describe('TeamDesiresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamDesiresService]
    });
  });

  it('should be created', inject([TeamDesiresService], (service: TeamDesiresService) => {
    expect(service).toBeTruthy();
  }));
});
