import { Component, OnInit } from '@angular/core';
import { piechart } from '../harmony-admin-dashboard/admin-cards/admin-cards.component';
import { ChildStatus, DashboardService, DateRange, GuardianDashboardData } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-parent-dashboard',
    templateUrl: './parent-dashboard.component.html',
    standalone: false
})
export class ParentDashboardComponent implements OnInit {
  range: DateRange = this.dashboardService.defaultRange();
  loading = false;

  childrenStatus: ChildStatus[] = [];

  public salesChart: any = this.buildBarChart([0,0,0,0,0,0,0], ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
  public tripGraphMetadata: any = {
    graphTitle: 'My Children\'s Trips',
    graphSubTitle: 'Trips in the selected period',
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
    this.dashboardService.getGuardianDashboard(this.range).subscribe({
      next: data => { this.apply(data); this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  private apply(data: GuardianDashboardData): void {
    this.childrenStatus = data.childrenStatus ?? [];

    this.pieChartData = [
      this.donut('My Children',   data.totalChildren,                   [data.activeChildren, data.totalChildren - data.activeChildren],     ['Active', 'Inactive'], '#1e88e5'),
      this.donut('Trips',         data.tripsInRange,                    [data.tripsCompletedInRange, data.tripsInRange - data.tripsCompletedInRange], ['Completed', 'Ongoing'], '#26c6da'),
      this.donut('Billing',       data.paidInvoices + data.overdueInvoices, [data.paidInvoices, data.overdueInvoices],                     ['Paid', 'Overdue'],    '#ffb22b'),
      this.donut('This Week',     data.tripsInRange,                    [data.tripsCompletedInRange, data.tripsInRange - data.tripsCompletedInRange], ['Done', 'Pending'],    '#fc4b6c'),
    ];

    this.salesChart = this.buildBarChart(data.dailyTripCounts ?? [], data.dailyTripLabels ?? []);
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
    const max = data.length ? Math.max(...data, 3) + 3 : 10;
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

  private buildEmptyCards(): Partial<piechart>[] {
    return [
      this.donut('My Children', 0, [0,0], ['Active','Inactive'],    '#1e88e5'),
      this.donut('Trips',       0, [0,0], ['Completed','Ongoing'],  '#26c6da'),
      this.donut('Billing',     0, [0,0], ['Paid','Overdue'],       '#ffb22b'),
      this.donut('This Week',   0, [0,0], ['Done','Pending'],       '#fc4b6c'),
    ];
  }
}
