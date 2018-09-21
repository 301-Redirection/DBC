import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
    let service: AuthService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                {
                    provide: Router,
                    useClass: class { navigate = jasmine.createSpy('navigate'); },
                },
            ],
        });
        service = TestBed.get(AuthService);
    });

    it('should be created', (done: DoneFn) => {
        expect(service).toBeTruthy();
        done();
    });

    // TODO: add more tests
});
