import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyManagementDetailComponent } from './survey-management-detail.component';

describe('SurveyManagementDetailComponent', () => {
  let component: SurveyManagementDetailComponent;
  let fixture: ComponentFixture<SurveyManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
