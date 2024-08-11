import { Component, computed, input, Signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Goal } from '../../models/goal.model';
import {
  getMonthDifference,
  getNextMonthsLabels,
} from '../../utils/date.utils';

@Component({
  selector: 'app-month-plan-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './month-plan-bar-chart.component.html',
  styleUrl: './month-plan-bar-chart.component.scss',
})
export class MonthPlanBarChartComponent {
  goals = input.required<Goal[]>();

  labels = computed(() => getNextMonthsLabels(12));
  goalsWithoutDueDate: Signal<(Goal & { dueDate: undefined })[]> = computed(
    () =>
      this.goals().filter((goal) => !goal.dueDate) as (Goal & {
        dueDate: undefined;
      })[]
  );
  goalsWithDueDate: Signal<(Goal & { dueDate: Date })[]> = computed(
    () =>
      this.goals().filter((goal) => !!goal.dueDate) as (Goal & {
        dueDate: Date;
      })[]
  );
  dataSet = computed(() =>
    this.goalsWithDueDate().map((goal, index, goals) => ({
      backgroundColor: `hsla(${Math.round(
        (360 / goals.length) * index
      )}, 75%, 60%, 1)`,
      data: this.mapGoalToChartData(goal),
      label: goal.title,
    }))
  );

  chartData = computed(() => ({
    labels: this.labels(),
    datasets: this.dataSet(),
  }));

  mapGoalToChartData = (goal: Goal & { dueDate: Date }) => {
    const nOfMonths = getMonthDifference(new Date(), goal.dueDate);
    const amountToSave = goal.targetAmount - goal.savedAmount;
    if (nOfMonths < 0 || amountToSave < 0) return [];

    return new Array(nOfMonths).fill(Math.ceil(amountToSave / nOfMonths));
  };

  options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        offset: true,
      },
      y: {
        stacked: true,
        offset: true,
      },
    },
    layout: {
      padding: 20,
    },
    plugins: {
      customCanvasBackgroundColor: {
        color: 'rgba(256, 256, 256, 0.05)',
      },
    },
    title: {
      display: true,
      text: 'Monthly Savings',
    },
  } as any;

  plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart: any, args: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };
}
