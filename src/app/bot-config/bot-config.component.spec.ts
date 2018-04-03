import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotConfigComponent } from './bot-config.component';

describe('BotConfigComponent', () => {
  let component: BotConfigComponent;
  let fixture: ComponentFixture<BotConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotConfigComponent ]
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
