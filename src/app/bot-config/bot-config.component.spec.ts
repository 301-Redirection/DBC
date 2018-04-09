import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotConfigComponent } from './bot-config.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('BotConfigComponent', () => {
    let component: BotConfigComponent;
    let fixture: ComponentFixture<BotConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ BotConfigComponent ],
        imports: [        
            NavbarModule,
            RouterTestingModule,
            FormsModule
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
        fixture = TestBed.createComponent(BotConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
