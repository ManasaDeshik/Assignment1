import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemRadioComponent } from './form-item-radio.component';

describe('FormItemRadioComponent', () => {
  let component: FormItemRadioComponent;
  let fixture: ComponentFixture<FormItemRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
