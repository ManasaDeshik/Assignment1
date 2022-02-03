import { TestBed } from '@angular/core/testing';

import { FetchDateInfoService } from './fetch-date-info.service';

describe('FetchDateInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchDateInfoService = TestBed.get(FetchDateInfoService);
    expect(service).toBeTruthy();
  });
});
