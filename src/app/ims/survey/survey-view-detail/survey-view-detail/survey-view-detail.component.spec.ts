import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewDetailComponent } from './survey-view-detail.component';

describe('SurveyViewDetailComponent', () => {
  let component: SurveyViewDetailComponent;
  let fixture: ComponentFixture<SurveyViewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyViewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
