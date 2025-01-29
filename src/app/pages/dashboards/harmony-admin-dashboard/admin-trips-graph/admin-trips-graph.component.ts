import {Component, Input, ViewChild} from '@angular/core';
import {TablerIconsModule} from 'angular-tabler-icons';
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
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from 'src/app/material.module';

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
    selector: 'app-admin-trips-graph',
    imports: [NgApexchartsModule, TablerIconsModule, MaterialModule],
    templateUrl: './admin-trips-graph.component.html'
})
export class AdminTripsGraphComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  @Input() public salesChart!: Partial<salesChart> | any;
  @Input() public graphMetadata: any;

  constructor() {
  }
}
