import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemRatingComponent } from './form-item-rating.component';

describe('FormItemRatingComponent', () => {
  let component: FormItemRatingComponent;
  let fixture: ComponentFixture<FormItemRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
