import { Component, computed, input, Signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Goal } from '../../models/goal.model';
import {
  getMonthDifference,
  getNextMonthsLabels,
} from '../../utils/date.utils';
import { MonthChartService } from '../../services/month-chart.service';
import { ChartData, ChartOptions, Plugin } from 'chart.js';

@Component({
  selector: 'app-month-plan-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './month-plan-bar-chart.component.html',
  styleUrl: './month-plan-bar-chart.component.scss',
})
export class MonthPlanBarChartComponent {
  config: {
    plugins: Plugin[];
    options: ChartOptions;
  };
  labels: string[];
  chartData: Signal<ChartData>;

  goals = input.required<Goal[]>();

  goalsWithoutDueDate: Signal<Goal[]> = computed(() =>
    this.goals().filter((goal) => !goal.dueDate)
  );

  constructor(private chartService: MonthChartService) {
    this.config = this.chartService.getChartConfig();
    this.labels = this.chartService.getLabels(12);

    this.chartData = computed(() => ({
      labels: this.labels,
      datasets: this.chartService.getDatasets(this.goals),
    }));
  }
}
