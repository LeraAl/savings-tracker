import { computed, Injectable, Signal } from '@angular/core';
import { getMonthDifference, getNextMonthsLabels } from '../utils/date.utils';
import { Goal } from '../models/goal.model';
import { UserSettingsService } from './user-settings.service';

@Injectable({
  providedIn: 'root',
})
export class MonthChartService {
  constructor(private userSettingsService: UserSettingsService) {}

  getChartConfig() {
    const options = {
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

    const plugins = [
      {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart: any, args: any, options: any) => {
          const { ctx } = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    ];

    return {
      options,
      plugins,
    };
  }

  getLabels(noOfMonth: number): string[] {
    return getNextMonthsLabels(noOfMonth);
  }

  getDatasets(goals: Signal<Goal[]>) {
    const barDataset = computed(() =>
      goals()
        .filter((goal) => !!goal.dueDate)
        .map((goal, index, goals) => ({
          backgroundColor: `hsla(${Math.round(
            (360 / goals.length) * index
          )}, 75%, 75%, 1)`,
          data: this.mapGoalToChartData(goal),
          label: goal.title,
          type: 'bar',
        }))
    );

    const lineDataSet = computed(() => {
      const data = barDataset().map((dataset) => dataset.data);
      return this.getTotalAmountsPerMonth(data);
    });

    const montlyLimit = this.userSettingsService.settings().monthlyLimit;
    const linePointColors = computed(() => {
      return lineDataSet().map((value) =>
        !!value && !!montlyLimit && value > montlyLimit
          ? 'rgba(255, 0, 0, 0.5)'
          : 'rgba(200, 200, 200, 0.5)'
      );
    });

    return [
      {
        type: 'line',
        label: 'Total',
        borderColor: 'rgba(54, 162, 235, 0.5)',
        showLine: false,
        pointHitRadius: 15,
        data: lineDataSet(),
        pointBackgroundColor: linePointColors(),
        pointBorderColor: linePointColors(),
        stack: 'Total',
        pointHoverRadius: 10,
        pointRadius: 0,
      },
      montlyLimit
        ? {
            type: 'line',
            label: 'Monthly Limit',
            borderColor: 'rgba(200, 200, 200, 0.5)',
            pointStyle: false,
            pointHitRadius: 15,
            data: new Array(12).fill(montlyLimit),
            stack: 'Monthly Limit',
          }
        : undefined,
      ...barDataset(),
    ] as any[];
  }

  mapGoalToChartData = (goal: Goal) => {
    if (!goal.dueDate) {
      throw new Error('dueDate should be defined');
    }

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

  getTotalAmountsPerMonth(data: (number | undefined)[][]) {
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
  }
}
