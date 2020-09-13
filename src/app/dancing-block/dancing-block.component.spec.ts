import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DancingBlockComponent } from './dancing-block.component';

describe('DancingBlockComponent', () => {
  let component: DancingBlockComponent;
  let fixture: ComponentFixture<DancingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DancingBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DancingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
