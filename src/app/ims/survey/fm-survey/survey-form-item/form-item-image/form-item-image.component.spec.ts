import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemImageComponent } from './form-item-image.component';

describe('FormItemImageComponent', () => {
  let component: FormItemImageComponent;
  let fixture: ComponentFixture<FormItemImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
