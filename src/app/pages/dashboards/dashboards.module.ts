import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

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
} from '../../components';
import { AdminCardsComponent } from './harmony-admin-dashboard/admin-cards/admin-cards.component';
import { AdminTripsGraphComponent } from './harmony-admin-dashboard/admin-trips-graph/admin-trips-graph.component';
import { StudentActivityGraphComponent } from './harmony-admin-dashboard/student-activity-graph/student-activity-graph.component';

@NgModule({
  imports: [
    RouterModule.forChild(DashboardsRoutes),
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatCardModule,
    AppPieCardsComponent,
    AppSalesOurVisitorsComponent,
    AppSalesOverviewComponent,
    AppNewsletterCampaignComponent,
    AdminCardsComponent,
    AdminTripsGraphComponent,
    StudentActivityGraphComponent,
  ],
  providers: [DatePipe],
  declarations: [
    HarmonyAdminDashboardComponent,
    SchoolAdminDashboardComponent,
    DriverDashboardComponent,
    ParentDashboardComponent,
  ],
})
export class DashboardsModule {}
