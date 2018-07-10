import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDesiresComponent } from './team-desires.component';

describe('TeamDesiresComponent', () => {
  let component: TeamDesiresComponent;
  let fixture: ComponentFixture<TeamDesiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDesiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDesiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
