import { TestBed } from '@angular/core/testing';

import { FmSurveyService } from './fm-survey.service';

describe('FmSurveyService', () => {
  let service: FmSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FmSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
