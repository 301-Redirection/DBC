import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes.component';
import { SortablejsModule } from 'angular-sortablejs';
import { ApiConnectService } from '../services/api-connect.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                FormsModule,
                SortablejsModule,
            ],
            providers: [
                ApiConnectService,
                HttpClient,
                HttpHandler,
            ],
        })
        .compileComponents();
    }));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
