import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockGeneratorComponent } from './block-generator.component';

describe('BlockGeneratorComponent', () => {
  let component: BlockGeneratorComponent;
  let fixture: ComponentFixture<BlockGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
