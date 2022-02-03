import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmSurveyComponent } from './fm-survey.component';

describe('FmSurveyComponent', () => {
  let component: FmSurveyComponent;
  let fixture: ComponentFixture<FmSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
