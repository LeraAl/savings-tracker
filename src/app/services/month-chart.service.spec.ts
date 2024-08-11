import { TestBed } from '@angular/core/testing';

import { MonthChartService } from './month-chart.service';

describe('MonthChartService', () => {
  let service: MonthChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
