import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiConnectService } from '../services/api-connect.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ HomeComponent ],
        imports: [        
            NavbarModule,
            RouterTestingModule
        ],
        providers: [
            ApiConnectService,
            HttpClient,
            HttpHandler
        ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
