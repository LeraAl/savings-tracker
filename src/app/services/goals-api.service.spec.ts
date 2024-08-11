import { TestBed } from '@angular/core/testing';

import { GoalsApiService } from './goals-api.service';

describe('GoalsApiServiceService', () => {
  let service: GoalsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
