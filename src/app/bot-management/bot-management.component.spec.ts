import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotManagementComponent } from './bot-management.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('BotManagementComponent', () => {
    let component: BotManagementComponent;
    let fixture: ComponentFixture<BotManagementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ BotManagementComponent ],
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
        fixture = TestBed.createComponent(BotManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
