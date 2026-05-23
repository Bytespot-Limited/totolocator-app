import { Component, OnInit } from '@angular/core';
import { piechart } from '../harmony-admin-dashboard/admin-cards/admin-cards.component';
import { DashboardService, DateRange, SchoolAdminDashboardData } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-school-admin-dashboard',
    templateUrl: './school-admin-dashboard.component.html',
    standalone: false
})
export class SchoolAdminDashboardComponent implements OnInit {
  range: DateRange = this.dashboardService.defaultRange();
  loading = false;

  public newsletterchartOptions: any = this.buildAreaChart([0,0,0,0,0,0],[0,0,0,0,0,0],['Jan','Feb','Mar','Apr','May','Jun']);
  public graphMetadata: any = {
    graphTitle: 'Students Retaining Rate',
    graphSubTitle: 'Overview of Total Vs Paying Students',
    lineGraphName1: 'Registered Students',
    lineGraphName2: 'Paying Students',
  };

  public salesChart: any = this.buildBarChart([0,0,0,0,0,0,0], ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
  public tripGraphMetadata: any = {
    graphTitle: 'Student Trips',
    graphSubTitle: 'Overview of Total Student Trips',
    barName: 'Trips',
  };

  public pieChartData: Partial<piechart>[] = this.buildEmptyCards();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void { this.load(); }

  applyRange(from: Date, to: Date): void {
    this.range = { from, to };
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.dashboardService.getSchoolAdminDashboard(this.range).subscribe({
      next: data => { this.apply(data); this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  private apply(data: SchoolAdminDashboardData): void {
    this.pieChartData = [
      this.donut('Drivers',  data.totalDrivers,  [data.activeDrivers,   data.inactiveDrivers],  ['Active','Inactive'], '#1e88e5'),
      this.donut('Fleets',   data.totalFleets,   [data.activeFleets,    data.inactiveFleets],   ['Active','Inactive'], '#26c6da'),
      this.donut('Students', data.totalStudents, [data.activeStudents,  data.inactiveStudents], ['Active','Inactive'], '#ffb22b'),
      this.donut('Billing',  data.billingsPaid + data.billingsOverdue, [data.billingsPaid, data.billingsOverdue], ['Paid','Overdue'], '#fc4b6c'),
    ];
    this.salesChart = this.buildBarChart(data.dailyTripCounts ?? [], data.dailyTripLabels ?? []);
    this.newsletterchartOptions = this.buildAreaChart(
      data.monthlyStudentTotals ?? [],
      data.monthlyPayingStudents ?? [],
      data.monthlyLabels ?? []
    );
  }

  private donut(name: string, total: number, series: number[], labels: string[], color: string): Partial<piechart> {
    return {
      name, sumOfRecords: total, series, labels,
      chart: { type: 'donut', fontFamily: 'Poppins,sans-serif', height: 100, offsetY: 0 },
      plotOptions: { pie: { donut: { size: '85px' } } },
      stroke: { width: 0 }, legend: { show: false },
      tooltip: { fillSeriesColor: false }, dataLabels: { enabled: false },
      colors: [color, 'rgba(0,0,0,0.1)'],
    };
  }

  private buildBarChart(data: number[], labels: string[]): any {
    const max = data.length ? Math.max(...data, 5) + 5 : 30;
    return {
      series: [{ name: 'Trip Count', data }],
      chart: { type: 'bar', height: 320, offsetX: -15, toolbar: { show: false }, foreColor: '#adb0bb', fontFamily: 'Poppins', sparkline: { enabled: false } },
      grid: { show: false },
      plotOptions: { bar: { horizontal: false, columnWidth: '35%', borderRadius: 0 } },
      dataLabels: { enabled: false },
      xaxis: { type: 'category', categories: labels },
      yaxis: { show: true, min: 0, max, tickAmount: 3 },
      stroke: { show: true, width: 5, lineCap: 'butt', colors: ['transparent'] },
      legend: { show: false },
      fill: { colors: ['#26c6da', '#1e88e5'], opacity: 1 },
      tooltip: { theme: 'dark' },
    };
  }

  private buildAreaChart(registered: number[], paying: number[], labels: string[]): any {
    return {
      series: [
        { name: 'Registered Students', data: registered },
        { name: 'Paying Students', data: paying },
      ],
      chart: { height: 365, fontFamily: 'Poppins,sans-serif', type: 'area', foreColor: '#adb0bb' },
      colors: ['#1e88e5', '#26c6da'], dataLabels: { enabled: false },
      markers: { size: 4, border: 1 }, legend: { show: false },
      xaxis: { categories: labels },
      grid: { show: true, borderColor: 'rgba(0,0,0,.2)', strokeDashArray: 2, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
      stroke: { curve: 'smooth', width: 3 },
      fill: { type: 'gradient', opacity: ['0.1', '0.1'] },
      tooltip: { theme: 'dark' },
    };
  }

  private buildEmptyCards(): Partial<piechart>[] {
    return [
      this.donut('Drivers',  0, [0, 0], ['Active', 'Inactive'], '#1e88e5'),
      this.donut('Fleets',   0, [0, 0], ['Active', 'Inactive'], '#26c6da'),
      this.donut('Students', 0, [0, 0], ['Active', 'Inactive'], '#ffb22b'),
      this.donut('Billing',  0, [0, 0], ['Paid',   'Overdue'],  '#fc4b6c'),
    ];
  }
}
