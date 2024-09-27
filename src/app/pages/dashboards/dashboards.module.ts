import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

// map
// import { DxVectorMapModule, DxPieChartModule } from 'devextreme-angular';

import { DashboardsRoutes } from './dashboards.routing';
import { HarmonyAdminDashboardComponent } from './harmony-admin-dashboard/harmony-admin-dashboard.component';
import { SchoolAdminDashboardComponent } from './school-admin-dashboard/school-admin-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import {
  AppNewsletterCampaignComponent,
  AppPieCardsComponent,
  AppSalesOurVisitorsComponent,
  AppSalesOverviewComponent
} from "../../components";
import { AdminCardsComponent } from './harmony-admin-dashboard/admin-cards/admin-cards.component';
import { AdminTripsGraphComponent } from './harmony-admin-dashboard/admin-trips-graph/admin-trips-graph.component';
import { StudentActivityGraphComponent } from './harmony-admin-dashboard/student-activity-graph/student-activity-graph.component';

@NgModule({
  imports: [RouterModule.forChild(DashboardsRoutes), AppPieCardsComponent, AppSalesOurVisitorsComponent, AppSalesOverviewComponent, AppNewsletterCampaignComponent, AdminCardsComponent, AdminTripsGraphComponent, StudentActivityGraphComponent],
  providers: [DatePipe],
  declarations: [
    HarmonyAdminDashboardComponent,
    SchoolAdminDashboardComponent,
    DriverDashboardComponent,
    ParentDashboardComponent
  ],
})
export class DashboardsModule {}
