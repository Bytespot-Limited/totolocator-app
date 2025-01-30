import {Component, Input, ViewChild} from '@angular/core';
import {TablerIconsModule} from 'angular-tabler-icons';
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from 'src/app/material.module';
import {NgForOf} from "@angular/common";

export interface piechart {
  name: string,
  sumOfRecords: number,
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any | any;
  tooltip: ApexTooltip | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  stroke: any | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
}

@Component({
    selector: 'app-admin-cards',
    imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, NgForOf],
    templateUrl: './admin-cards.component.html'
})
export class AdminCardsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  @Input() public pieChartData: Partial<piechart> [] = [];

  constructor() {

  }
}
