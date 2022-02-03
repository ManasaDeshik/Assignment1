import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemFileuploadComponent } from './form-item-fileupload.component';

describe('FormItemFileuploadComponent', () => {
  let component: FormItemFileuploadComponent;
  let fixture: ComponentFixture<FormItemFileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemFileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
