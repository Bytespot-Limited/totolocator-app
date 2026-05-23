import { Component, OnInit } from '@angular/core';
import { piechart } from '../harmony-admin-dashboard/admin-cards/admin-cards.component';
import { DashboardService, DateRange, DriverDashboardData, StudentBoardingItem } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-driver-dashboard',
    templateUrl: './driver-dashboard.component.html',
    standalone: false
})
export class DriverDashboardComponent implements OnInit {
  range: DateRange = this.dashboardService.defaultRange();
  loading = false;

  fleetPlate = 'N/A';
  terminalStatus = 'NONE';
  currentTripRoster: StudentBoardingItem[] = [];

  public salesChart: any = this.buildBarChart([0,0,0,0,0,0,0], ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
  public tripGraphMetadata: any = {
    graphTitle: 'My Trips',
    graphSubTitle: 'Trips this period',
    barName: 'Trips',
  };

  public pieChartData: Partial<piechart>[] = this.buildEmptyCards();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void { this.load(); }

  applyRange(): void {
    this.load();
  }

  get boardedPercent(): number {
    const total = this.currentTripRoster.length;
    if (!total) return 0;
    const boarded = this.currentTripRoster.filter(s => s.boardingStatus === 'BOARDED' || s.boardingStatus === 'DROPPED_OFF').length;
    return Math.round((boarded / total) * 100);
  }

  private load(): void {
    this.loading = true;
    this.dashboardService.getDriverDashboard(this.range).subscribe({
      next: data => { this.apply(data); this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  private apply(data: DriverDashboardData): void {
    this.fleetPlate = data.fleetNumberPlate || 'N/A';
    this.terminalStatus = data.terminalStatus || 'NONE';
    this.currentTripRoster = data.currentTripRoster ?? [];

    const boarded = data.boardedInRange ?? 0;
    const pending = data.pendingInRange ?? 0;
    const total = data.totalStudentsOnFleet ?? 0;
    const completed = data.tripsCompletedInRange ?? 0;
    const tripsTotal = data.tripsTotalInRange ?? 0;

    this.pieChartData = [
      this.donut('Students Boarded', boarded + pending, [boarded, pending], ['Boarded', 'Pending'], '#1e88e5'),
      this.donut('My Bus', 1, [1, 0], [this.fleetPlate, ''], this.terminalStatus === 'ONLINE' ? '#26c6da' : '#fc4b6c'),
      this.donut('Trips', tripsTotal, [completed, tripsTotal - completed], ['Completed', 'Pending'], '#ffb22b'),
      this.donut('Students', total, [boarded, total - boarded], ['Boarded', 'Not Boarded'], '#fc4b6c'),
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
    const max = data.length ? Math.max(...data, 5) + 5 : 10;
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
      this.donut('Students Boarded', 0, [0, 0], ['Boarded',   'Pending'],     '#1e88e5'),
      this.donut('My Bus',           0, [0, 0], ['N/A',       ''],            '#26c6da'),
      this.donut('Trips',            0, [0, 0], ['Completed', 'Pending'],     '#ffb22b'),
      this.donut('Students',         0, [0, 0], ['Boarded',   'Not Boarded'], '#fc4b6c'),
    ];
  }
}
