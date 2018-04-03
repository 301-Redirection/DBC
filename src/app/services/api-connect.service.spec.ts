import { TestBed, inject } from '@angular/core/testing';

import { ApiConnectService } from './api-connect.service';

describe('ApiConnectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiConnectService]
    });
  });

  it('should be created', inject([ApiConnectService], (service: ApiConnectService) => {
    expect(service).toBeTruthy();
  }));
});
