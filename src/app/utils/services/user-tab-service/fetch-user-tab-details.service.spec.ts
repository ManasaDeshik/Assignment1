import { TestBed } from '@angular/core/testing';

import { FetchUserTabDetailsService } from './fetch-user-tab-details.service';

describe('FetchUserTabDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchUserTabDetailsService = TestBed.get(FetchUserTabDetailsService);
    expect(service).toBeTruthy();
  });
});
