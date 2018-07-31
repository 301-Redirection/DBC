import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth/auth.service';

@Component({ selector: 'app-navbar', template: '' })
class NavbarModule {}

let authServiceStub : Partial<AuthService>;

authServiceStub = {
    handleAuth: () => { },
};

describe('AppComponent', () => {
    let component;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                NavbarModule,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                { provide: AuthService, useValue: authServiceStub },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        const fixture = TestBed.createComponent(AppComponent);
        // authService = fixture.debugElement.injector.get(AuthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }));
});
