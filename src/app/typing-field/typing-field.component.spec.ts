import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingFieldComponent } from './typing-field.component';

describe('TypingFieldComponent', () => {
  let component: TypingFieldComponent;
  let fixture: ComponentFixture<TypingFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
