import {Routes} from '@angular/router';


import {DriverListingComponent} from "./drivers/driver-listing/driver-listing.component";
import {SchoolsComponent} from "./schools/schools.component";
import {SchoolStuffComponent} from "./school-stuff/school-stuff.component";
import {GuardiansComponent} from "./guardians/guardians.component";
import {StudentsComponent} from "./students/students.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {TripsComponent} from "./trips/trips.component";
import {TerminalsComponent} from "./terminals/terminals.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {StudentTripComponent} from "./trips/student-trip/student-trip.component";
import {TerminalViewComponent} from "./terminals/terminal-view/terminal-view.component";
import { OrganizationsComponent } from './organizations/organizations.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'organizations',
        component: OrganizationsComponent,
        data: {
          title: 'Organizations',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Organizations'}
          ],
        }
      },
      {
        path: 'schools',
        component: SchoolsComponent,
        data: {
          title: 'Schools',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Schools'}
          ],
        }
      }
      ,
      {
        path: 'staff',
        component: SchoolStuffComponent,
        data: {
          title: 'Staff',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Staff'}
          ],
        }
      }
      ,
      {
        path: 'guardians',
        component: GuardiansComponent,
        data: {
          title: 'Guardians',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Guardians'}
          ],
        }
      }
      ,
      {
        path: 'students',
        component: StudentsComponent,
        data: {
          title: 'Students',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Students'}
          ],
        }
      }
      ,
      {
        path: 'drivers',
        component: DriverListingComponent,
        data: {
          title: 'Drivers',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Drivers'},
          ],
        },
      }
      ,
      {
        path: 'vehicles',
        component: VehiclesComponent,
        data: {
          title: 'Vehicles',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Vehicles'},
          ],
        },
      }
      ,
      {
        path: 'trips',
        component: TripsComponent,
        data: {
          title: 'Trips',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Trips'},
          ],
        },
      },
      {
        path: 'trips/students/:id',
        component: StudentTripComponent,
        data: {
          title: 'Student Trips',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Students in Trip'},
          ],
        },
      },

      {
        path: 'terminals',
        component: TerminalsComponent,
        data: {
          title: 'Terminals',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Terminals'},
          ],
        },
      },
      {
        path: 'terminals/:id',
        component: TerminalViewComponent,
        data: {
          title: 'Terminal Info',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Terminal Info'},
          ],
        },
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        data: {
          title: 'Invoices',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Invoices'},
          ],
        },
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: {
          title: 'Notifications',
          urls: [
            {title: 'Dashboard', url: '/dashboards/dashboard1'},
            {title: 'Notifications'},
          ],
        },
      }
    ],
  },
];
