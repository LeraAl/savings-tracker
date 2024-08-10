import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPlanBarChartComponent } from './month-plan-bar-chart.component';

describe('MonthPlanBarChartComponent', () => {
  let component: MonthPlanBarChartComponent;
  let fixture: ComponentFixture<MonthPlanBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthPlanBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthPlanBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
