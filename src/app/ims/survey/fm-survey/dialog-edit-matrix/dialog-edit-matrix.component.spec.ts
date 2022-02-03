import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMatrixComponent } from './dialog-edit-matrix.component';

describe('DialogEditMatrixComponent', () => {
  let component: DialogEditMatrixComponent;
  let fixture: ComponentFixture<DialogEditMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
