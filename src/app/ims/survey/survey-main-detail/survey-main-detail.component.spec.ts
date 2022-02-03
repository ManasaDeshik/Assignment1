import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMainDetailComponent } from './survey-main-detail.component';

describe('SurveyMainDetailComponent', () => {
  let component: SurveyMainDetailComponent;
  let fixture: ComponentFixture<SurveyMainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMainDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
