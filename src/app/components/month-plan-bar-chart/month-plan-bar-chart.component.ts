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
  barDataset = computed(() =>
    this.goalsWithDueDate().map((goal, index, goals) => ({
      backgroundColor: `hsla(${Math.round(
        (360 / goals.length) * index
      )}, 75%, 60%, 1)`,
      data: this.mapGoalToChartData(goal),
      label: goal.title,
      type: 'bar',
    }))
  );

  lineDataSet = computed(() => {
    const data = this.barDataset().map((dataset) => dataset.data);

    return data.reduce((acc, val) => {
      val.forEach((v, index) => {
        if (acc[index] == undefined) {
          acc.push(v ?? 0);
        } else {
          acc[index] += v ?? 0;
        }
      });
      return acc;
    }, []);
  });

  chartData = computed(() => ({
    labels: this.labels(),
    datasets: [
      {
        type: 'line',
        label: 'Total',
        borderColor: 'rgb(54, 162, 235)',
        pointHitRadius: 15,
        data: this.lineDataSet(),
      },
      ...this.barDataset(),
    ] as any[],
  }));

  mapGoalToChartData = (goal: Goal & { dueDate: Date }) => {
    const startDate =
      goal.savingStartDate > new Date() ? goal.savingStartDate : new Date();
    let nOfMonths = getMonthDifference(startDate, goal.dueDate);
    if (new Date().getDate() < 15) {
      nOfMonths += 1;
    }
    const amountToSave = goal.targetAmount - goal.savedAmount;
    if (nOfMonths < 0 || amountToSave < 0) return [];

    const nOfMonthsTillStart = getMonthDifference(new Date(), startDate);

    return new Array(nOfMonths + nOfMonthsTillStart)
      .fill(0)
      .fill(Math.ceil(amountToSave / nOfMonths), nOfMonthsTillStart);
  };

  options = {
    responsive: true,
    elements: {
      line: {
        backgroundColor: 'rgba(256, 256, 256)',
      },
    },
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
