import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Goal } from '../../models/goal.model';
import { Chart, LegendElement, LegendItem, Title } from 'chart.js';

@Component({
  selector: 'app-all-goals-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './all-goals-pie-chart.component.html',
  styleUrl: './all-goals-pie-chart.component.scss',
})
export class AllGoalsPieChartComponent {
  goals = input.required<Goal[]>();

  labels = computed(() => this.goals().map((goal) => goal.title));
  dataSet = computed(() =>
    this.goals().map((goal, index, goals) => ({
      backgroundColor: [
        `hsla(${Math.round((360 / goals.length) * index)}, 75%, 60%, 1)`,
        `hsla(${Math.round((360 / goals.length) * index)}, 50%, 75%, 1)`,
      ],
      label: goal.title,
      labels: ['Saved', 'To Save'],
      data: [goal.savedAmount, goal.targetAmount - goal.savedAmount],
    }))
  );

  chartData = computed(() => ({
    labels: this.labels(),
    datasets: this.dataSet(),
  }));

  options = {
    responsive: true,
    plugins: {
      legend: {
        onClick: function (mouseEvent: any, legendItem: any, legend: any) {
          const datasetIndex = legendItem.index;
          legend.chart.getDatasetMeta(datasetIndex).hidden =
            legend.chart.isDatasetVisible(datasetIndex);
          legend.chart.update();
        },
        labels: {
          generateLabels: function (chart: any) {
            // Get the default label list
            const original =
              Chart.overrides.pie.plugins.legend.labels.generateLabels;
            const labelsOriginal = original.call(this, chart);

            // Build an array of colors used in the datasets of the chart
            let datasetColors = chart.data.datasets.map(function (e: any) {
              return e.backgroundColor[1];
            });

            // Modify the color and hide state of each label
            labelsOriginal.forEach((label: LegendItem) => {
              const index = label.index;

              if (index != undefined) {
                // The hidden state must match the dataset's hidden state
                label.hidden = !chart.isDatasetVisible(index);

                // Change the color to match the dataset
                label.fillStyle = datasetColors[index];
              }
            });

            return labelsOriginal;
          },
        },
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            return context[0].dataset.label;
          },
          label: function (context: any) {
            return (
              context.dataset.labels[context.dataIndex] +
              ': ' +
              context.formattedValue
            );
          },
        },
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart',
      },
    },
  };
}
