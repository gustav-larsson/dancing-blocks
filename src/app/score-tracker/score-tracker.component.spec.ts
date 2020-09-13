import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTrackerComponent } from './score-tracker.component';

describe('ScoreTrackerComponent', () => {
  let component: ScoreTrackerComponent;
  let fixture: ComponentFixture<ScoreTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
