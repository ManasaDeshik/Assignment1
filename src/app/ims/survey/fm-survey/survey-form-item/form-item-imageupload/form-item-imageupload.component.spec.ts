import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemImageuploadComponent } from './form-item-imageupload.component';

describe('FormItemImageuploadComponent', () => {
  let component: FormItemImageuploadComponent;
  let fixture: ComponentFixture<FormItemImageuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemImageuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemImageuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
