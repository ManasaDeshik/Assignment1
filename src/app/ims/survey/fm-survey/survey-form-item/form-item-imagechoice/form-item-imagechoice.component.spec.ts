import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemImagechoiceComponent } from './form-item-imagechoice.component';

describe('FormItemImagechoiceComponent', () => {
  let component: FormItemImagechoiceComponent;
  let fixture: ComponentFixture<FormItemImagechoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemImagechoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemImagechoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
