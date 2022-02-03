import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemMatrixComponent } from './form-item-matrix.component';

describe('FormItemMatrixComponent', () => {
  let component: FormItemMatrixComponent;
  let fixture: ComponentFixture<FormItemMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
