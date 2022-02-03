import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveymanagementComponent } from './surveymanagement.component';

describe('SurveymanagementComponent', () => {
  let component: SurveymanagementComponent;
  let fixture: ComponentFixture<SurveymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
