import { TestBed, inject } from '@angular/core/testing';
import { ApiConnectService } from './api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

describe('ApiConnectService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiConnectService,
                HttpClient,
                HttpHandler,
                { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
            ],
        });
    });

    it('should be created', inject([ApiConnectService], (service: ApiConnectService) => {
        expect(service).toBeTruthy();
    }));
});
