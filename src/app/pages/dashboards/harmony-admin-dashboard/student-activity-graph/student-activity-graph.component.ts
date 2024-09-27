import {Component, Input, ViewChild} from '@angular/core';
import {TablerIconsModule} from 'angular-tabler-icons';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexTooltip,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from 'src/app/material.module';

export interface newsletterchartOption {
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

@Component({
  selector: 'app-student-activity-graph',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule],
  templateUrl: './student-activity-graph.component.html',
})
export class StudentActivityGraphComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  @Input() newsletterchartOptions!: Partial<newsletterchartOption> | any;
  @Input() graphMetadata: any;

  constructor() {
  }
}
