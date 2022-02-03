import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemTextComponent } from './form-item-text.component';

describe('FormItemTextComponent', () => {
  let component: FormItemTextComponent;
  let fixture: ComponentFixture<FormItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
