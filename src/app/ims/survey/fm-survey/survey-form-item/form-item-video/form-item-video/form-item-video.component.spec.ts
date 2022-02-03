import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemVideoComponent } from './form-item-video.component';

describe('FormItemVideoComponent', () => {
  let component: FormItemVideoComponent;
  let fixture: ComponentFixture<FormItemVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
