import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsStatisticsComponent } from './goals-statistics.component';

describe('GoalsStatisticsComponent', () => {
  let component: GoalsStatisticsComponent;
  let fixture: ComponentFixture<GoalsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
