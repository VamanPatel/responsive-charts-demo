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
  barChartsLabel: any[] = [];

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

  barChartValues: any[] = [];
  pieChartValues: any[] = [];
  lineChartValues: any[] = [];

  constructor(private api: ApiService) {
    /* --------------------------------- to used all the charts in angular -------------------------------- */
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getBarChartData();
    this.getLineChartData();
    this.getPieChartData();
  }

  /* ----------------------------------- getting bar chart data from api ---------------------------------- */
  getBarChartData() {
    this.api.getBarData().subscribe(
      (res) => {
        console.log(res);

        if (res) {
          const data = res.map((i) => i.value);
          this.barChartsLabel = res.map((j) => j.month);
          this.setBarChart(data);
          this.barChartValues = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* ----------------------------------- getting pie chart data from api ---------------------------------- */
  getPieChartData() {
    this.api.getPieData().subscribe(
      (res) => {
        console.log(res);

        if (res) {
          const data = res.map((i) => i.value);
          this.pieChartsLabel = res.map((j) => j.color);
          this.setPieChart(data);
          this.pieChartValues = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* ---------------------------------- getting line chart data from api ---------------------------------- */
  getLineChartData() {
    this.api.getLineData().subscribe(
      (res) => {
        console.log(res);

        if (res) {
          const data = res.map((i) => i.value);
          this.lineChartsLabel = res.map((j) => j.month);
          this.setLineChart(data);
          this.lineChartValues = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /* ------------------------------------------ bar chart config ------------------------------------------ */
  setBarChart(data: any) {
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
        data: data,
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
  setPieChart(data: any) {
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
        data: data,
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

  setLineChart(data: any) {
    this.lineChartOptions = {
      responsive: true,
    };

    this.lineChartData = [
      {
        label: 'Line Chart',
        data: data,
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

  /* ------------------------------------------------------------------------------------------------------ */
  /*                                    exporting all the data into excel                                   */
  /* ------------------------------------------------------------------------------------------------------ */

  exportBarData() {
    this.api.showHideSpinner = true;

    setTimeout(() => {
      this.api.exportExcelData(this.barChartValues, 'BarChartData');

      this.api.showHideSpinner = false;
    }, 1000);
  }

  exportPieData() {
    this.api.showHideSpinner = true;

    setTimeout(() => {
      this.api.exportExcelData(this.pieChartValues, 'PieChartData');

      this.api.showHideSpinner = false;
    }, 1000);
  }

  exportLineData() {
    this.api.showHideSpinner = true;

    setTimeout(() => {
      this.api.exportExcelData(this.lineChartValues, 'LineChartData');
      this.api.showHideSpinner = false;
    }, 1000);
  }
}
