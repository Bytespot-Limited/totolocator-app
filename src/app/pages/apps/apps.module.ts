import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';


import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';

// blog
import { NgScrollbarModule } from 'ngx-scrollbar';

// Driver components
import {
  DriverListingComponent
} from './drivers/driver-listing/driver-listing.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { SchoolsComponent } from './schools/schools.component';
import { CrudDataTableComponent } from './reusable/crud-data-table/crud-data-table.component';
import { CrudFormComponent } from './reusable/crud-form/crud-form.component';
import { SchoolViewComponent } from './schools/school-view/school-view.component';
import { TripsComponent } from './trips/trips.component';
import { TerminalsComponent } from './terminals/terminals.component';
import { StudentsComponent } from './students/students.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SchoolStuffComponent } from './school-stuff/school-stuff.component';
import { GuardiansComponent } from './guardians/guardians.component';
import {
  DialogBoxComponent,
  StudentTripComponent
} from './trips/student-trip/student-trip.component';
import { TerminalViewComponent } from './terminals/terminal-view/terminal-view.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import {DynamicFormComponent} from "./reusable/dynamic-form/dynamic-form.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatNativeDateModule,
    NgScrollbarModule,
  ],
  exports: [TablerIconsModule],
  declarations: [

    DriverListingComponent,
    AddDriverComponent,
    OrganizationsComponent,
    SchoolsComponent,
    CrudDataTableComponent,
    CrudFormComponent,
    SchoolViewComponent,
    TripsComponent,
    TerminalsComponent,
    StudentsComponent,
    InvoicesComponent,
    NotificationsComponent,
    VehiclesComponent,
    SchoolStuffComponent,
    GuardiansComponent,
    StudentTripComponent,
    TerminalViewComponent,
    DialogBoxComponent,
    DynamicFormComponent
  ],
  providers: [DatePipe],
})
export class AppsModule {}
