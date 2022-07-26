import { Component, OnInit } from '@angular/core';
import {
  ChartOptions,
  ChartType,
  ChartData,
  Chart,
  registerables,
} from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public barChartOptions!: ChartOptions;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  barChart!: Chart;
  barChartsLabel: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'];

  public pieChartOptions!: ChartOptions;
  public pieChartData: any[] = [];
  public pieChartsLabel: any[] = ['Red', 'Blue', 'Yellow', 'DarkBlue'];
  pieChart!: Chart;

  public lineChartOptions!: ChartOptions;
  public lineChartData: any[] = [];
  public lineChartsLabel: any[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
  ];
  lineChart!: Chart;

  constructor(private api: ApiService) {
    /* --------------------------------- to used all the charts in angular -------------------------------- */
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.setBarChart();
    this.setPieChart();
    this.setLineChart();
  }

  /* ------------------------------------------ bar chart config ------------------------------------------ */
  setBarChart() {
    this.barChartOptions = {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
        },
      },
    };
    this.barChartData = [
      {
        label: 'Bar Chart',
        data: [65, 59, 80, 81, 56, 43, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ];
    let canvas = <any>document.getElementById('barCharts');
    this.barChart = new Chart(canvas, {
      data: {
        datasets: this.barChartData,
        labels: this.barChartsLabel,
      },
      options: this.barChartOptions,
      type: 'bar',
    });
    let myChart = this.barChart;
    myChart.update();
  }

  /* ------------------------------------------- pie chat config ------------------------------------------ */
  setPieChart() {
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
        },
      },
    };

    this.pieChartData = [
      {
        label: 'Pie Chart',
        data: [300, 50, 100, 236],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'blue',
        ],
      },
    ];
    let canvas = <any>document.getElementById('pieCharts');
    this.pieChart = new Chart(canvas, {
      data: {
        datasets: this.pieChartData,
        labels: this.pieChartsLabel,
      },
      options: this.pieChartOptions,
      type: 'pie',
    });
    let myChart = this.pieChart;
    myChart.update();
  }

  setLineChart() {
    this.lineChartOptions = {
      responsive: true,
    };

    this.lineChartData = [
      {
        label: 'Line Chart',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ];
    let canvas = <any>document.getElementById('lineCharts');
    this.lineChart = new Chart(canvas, {
      data: {
        datasets: this.lineChartData,
        labels: this.lineChartsLabel,
      },
      options: this.lineChartOptions,
      type: 'line',
    });
    let myChart = this.lineChart;
    myChart.update();
  }

  exportBarData() {
    this.api.showHideSpinner = true;

    setTimeout(() => {
      this.api.exportExcelData(
        [
          {
            id: 1,
            month: 'Jan',
            value: 65,
          },
          {
            id: 2,
            month: 'Feb',
            value: 59,
          },
          {
            id: 3,
            month: 'Mar',
            value: 80,
          },
          {
            id: 4,
            month: 'Apr',
            value: 81,
          },
          {
            id: 5,
            month: 'May',
            value: 56,
          },
          {
            id: 6,
            month: 'Jun',
            value: 43,
          },
          {
            id: 7,
            month: 'Jul',
            value: 40,
          },
        ],
        'BarChartData'
      );

      this.api.showHideSpinner = false;
    }, 1000);
  }

  exportPieData() {
    this.api.showHideSpinner = true;

    setTimeout(() => {
      this.api.exportExcelData(
        [
          {
            id: 1,
            color: 'Red',
            value: 300,
          },
          {
            id: 2,
            color: 'Blue',
            value: 50,
          },
          {
            id: 3,
            color: 'Yellow',
            value: 100,
          },
          {
            id: 4,
            color: 'DarkBlue',
            value: 236,
          },
        ],
        'PieChartData'
      );

      this.api.showHideSpinner = false;
    }, 1000);
  }
  exportLineData() {
    this.api.showHideSpinner = true;

    setTimeout(() => {
      this.api.exportExcelData(
        [
          {
            id: 1,
            month: 'Jan',
            value: 65,
          },
          {
            id: 2,
            month: 'Feb',
            value: 59,
          },
          {
            id: 3,
            month: 'Mar',
            value: 80,
          },
          {
            id: 4,
            month: 'Apr',
            value: 81,
          },
          {
            id: 5,
            month: 'May',
            value: 56,
          },
          {
            id: 6,
            month: 'Jun',
            value: 55,
          },
          {
            id: 7,
            month: 'Jun',
            value: 40,
          },
        ],
        'LineChartData'
      );
      this.api.showHideSpinner = false;
    }, 1000);
  }
}
