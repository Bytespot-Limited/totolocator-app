import {Component} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import {piechart} from "../harmony-admin-dashboard/admin-cards/admin-cards.component";


export interface newsletterchartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: any | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  fill: ApexFill | any;
}

export interface salesChart {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
  marker: ApexMarkers | any;
}

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
})
export class ParentDashboardComponent {
  // Creating data to feed into the student activity graph
  public newsletterchartOptions: Partial<newsletterchartOptions> | any = {
    series: [
      {
        name: 'Registered Student',
        data: [250, 390, 485, 485, 490, 515, 530, 546],
      },
      {
        name: 'Paying Students',
        data: [245, 360, 478, 480, 480, 500, 530, 530],
      },
    ],
    chart: {
      height: 365,
      fontFamily: 'Poppins,sans-serif',
      type: 'area',
      foreColor: '#adb0bb',
    },
    colors: ['#1e88e5', '#26c6da'],
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      border: 1,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, .2)',
      color: 'rgba(0, 0, 0, .2)',
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      opacity: ['0.1', '0.1'],
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };
  public graphMetadata: any = {
    graphTitle: "Students Retaining Rate",
    graphSubTitle: "Overview of Total Vs Paying Students",
    lineGraphName1: "Registered Students",
    lineGraphName2: "Paying Students"
  }


  // Creating data for the school trips graph
  public salesChart: Partial<salesChart> | any = {
    series: [
      {name: 'Trip Count', data: [20, 18, 25, 19, 21, 2, 0]}
    ],
    chart: {
      type: 'bar',
      height: 320,
      offsetX: -15,
      toolbar: {show: false},
      foreColor: '#adb0bb',
      fontFamily: 'Poppins',
      sparkline: {enabled: false},
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {horizontal: false, columnWidth: '35%', borderRadius: 0},
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yaxis: {
      show: true,
      min: 0,
      max: 30,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },

    legend: {
      show: false,
    },
    fill: {
      colors: ['#26c6da', '#1e88e5'],
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
    },
  };
  public tripGraphMetadata: any = {
    graphTitle: "Student Trips",
    graphSubTitle: "Overview of Total Student Trips",
    barName: "Trips",
  }

  // Creating data for cards
  public pieChartData: Partial<piechart> | any = [
    {
      name: 'Students',
      sumOfRecords: 2,
      series: [2, 0],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
          },
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Active', 'Inactive'],
      colors: ['#1e88e5', 'rgba(0, 0, 0, 0.1)'],
    },
    {
      name: 'Guardians',
      sumOfRecords: 2,
      series: [1, 1],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
          },
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Active', 'Inactive'],
      colors: ['#ffb22b', 'rgba(0, 0, 0, 0.1)'],
    },
    {
      name: 'Trips This Week',
      sumOfRecords: 8,
      series: [7, 1],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
          },
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Completed', 'Pending'],
      colors: ['#26c6da', 'rgba(0, 0, 0, 0.1)'],
    },
    {
      name: 'Invoices',
      sumOfRecords: 2,
      series: [2, 0],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
          },
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Paid', 'Unpaid'],
      colors: ['#fc4b6c', 'rgba(0, 0, 0, 0.1)'],
    }
  ];

}
