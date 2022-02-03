import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFormItemComponent } from './survey-form-item.component';

describe('SurveyFormItemComponent', () => {
  let component: SurveyFormItemComponent;
  let fixture: ComponentFixture<SurveyFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFormItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
