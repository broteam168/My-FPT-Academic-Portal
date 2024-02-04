import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmajorComponent } from './submajor.component';

describe('SubmajorComponent', () => {
  let component: SubmajorComponent;
  let fixture: ComponentFixture<SubmajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmajorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
