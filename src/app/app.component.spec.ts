import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarModule } from './navbar/navbar.module';
import { AuthService } from './auth/auth.service';
import { ApiConnectService } from './services/api-connect.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AppComponent
        ],
        imports: [ 
            RouterTestingModule,
            NavbarModule 
        ],
        providers: [
            AuthService,
            ApiConnectService,
            HttpClient,
            HttpHandler
        ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    
});
