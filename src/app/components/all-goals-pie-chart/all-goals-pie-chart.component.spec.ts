import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoalsPieChartComponent } from './all-goals-pie-chart.component';

describe('AllGoalsPieChartComponent', () => {
  let component: AllGoalsPieChartComponent;
  let fixture: ComponentFixture<AllGoalsPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGoalsPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGoalsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
