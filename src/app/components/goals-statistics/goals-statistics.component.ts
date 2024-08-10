import { Component, computed, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AllGoalsPieChartComponent } from '../all-goals-pie-chart/all-goals-pie-chart.component';
import { MonthPlanBarChartComponent } from '../month-plan-bar-chart/month-plan-bar-chart.component';
import { GoalsService } from '../../services/goals.service';
import { Goal } from '../../models/goal.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-goals-statistics',
  standalone: true,
  imports: [
    MatCardModule,
    AllGoalsPieChartComponent,
    MonthPlanBarChartComponent,
    CurrencyPipe,
  ],
  templateUrl: './goals-statistics.component.html',
  styleUrl: './goals-statistics.component.scss',
})
export class GoalsStatisticsComponent {
  goals: Signal<Goal[]>;
  goalsCount: Signal<number>;
  totalAmount: Signal<number>;
  totalSavedAmount: Signal<number>;

  constructor(private goalsService: GoalsService) {
    this.goals = this.goalsService.goals;
    this.goalsCount = computed(() => this.goals().length);
    this.totalAmount = computed(() =>
      this.goals().reduce((acc, goal) => acc + goal.targetAmount, 0)
    );
    this.totalSavedAmount = computed(() =>
      this.goals().reduce((acc, goal) => acc + goal.savedAmount, 0)
    );
  }
}
