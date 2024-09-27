import {Routes} from '@angular/router';

// dashboards
import {AppDashboard1Component} from './dashboard1/dashboard1.component';
import {AppDashboard2Component} from './dashboard2/dashboard2.component';
import {AppDashboard3Component} from './dashboard3/dashboard3.component';
import {AppDashboard4Component} from './dashboard4/dashboard4.component';
import {AppDashboard5Component} from './dashboard5/dashboard5.component';
import {AppDashboard6Component} from './dashboard6/dashboard6.component';
import {
  HarmonyAdminDashboardComponent
} from "./harmony-admin-dashboard/harmony-admin-dashboard.component";
import {
  SchoolAdminDashboardComponent
} from "./school-admin-dashboard/school-admin-dashboard.component";
import {DriverDashboardComponent} from "./driver-dashboard/driver-dashboard.component";
import {ParentDashboardComponent} from "./parent-dashboard/parent-dashboard.component";

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'harmony-admin',
        component: HarmonyAdminDashboardComponent,
        data: {
          title: 'Harmony Admin',
          urls: [
            {title: 'Admin', url: '/dashboards/harmony-admin'},
            {title: 'Harmony Admin'},
          ],
        },
      },
      {
        path: 'school-admin',
        component: SchoolAdminDashboardComponent,
        data: {
          title: 'School Admin',
          urls: [
            {title: 'School Admin', url: '/dashboards/school-admin'},
            {title: 'School Admin'},
          ],
        },
      },
      {
        path: 'driver',
        component: DriverDashboardComponent,
        data: {
          title: 'Driver',
          urls: [
            {title: 'Driver', url: '/dashboards/driver'},
            {title: 'Driver'},
          ],
        },
      },
      {
        path: 'guardian',
        component: ParentDashboardComponent,
        data: {
          title: 'Guardian',
          urls: [
            {title: 'Guardian', url: '/dashboards/guardian'},
            {title: 'Guardian'},
          ],
        },
      },

      // {
      //   path: 'dashboard1',
      //   component: AppDashboard1Component,
      //   data: {
      //     title: 'Dashboard 1',
      //     urls: [
      //       {title: 'Dashboard', url: '/dashboards/dashboard1'},
      //       {title: 'Dashboard 1'},
      //     ],
      //   },
      // },
      // {
      //   path: 'dashboard2',
      //   component: AppDashboard2Component,
      //   data: {
      //     title: 'Dashboard 2',
      //     urls: [
      //       {title: 'Dashboard', url: '/dashboards/dashboard1'},
      //       {title: 'Dashboard 2'},
      //     ],
      //   },
      // },
      // {
      //   path: 'dashboard3',
      //   component: AppDashboard3Component,
      //   data: {
      //     title: 'Dashboard 3',
      //     urls: [
      //       {title: 'Dashboard', url: '/dashboards/dashboard1'},
      //       {title: 'Dashboard 3'},
      //     ],
      //   },
      // },
      // {
      //   path: 'dashboard4',
      //   component: AppDashboard4Component,
      //   data: {
      //     title: 'Dashboard 4',
      //     urls: [
      //       {title: 'Dashboard', url: '/dashboards/dashboard1'},
      //       {title: 'Dashboard 4'},
      //     ],
      //   },
      // },
      // {
      //   path: 'dashboard5',
      //   component: AppDashboard5Component,
      //   data: {
      //     title: 'Dashboard 5',
      //     urls: [
      //       {title: 'Dashboard', url: '/dashboards/dashboard1'},
      //       {title: 'Dashboard 5'},
      //     ],
      //   },
      // },
      // {
      //   path: 'dashboard6',
      //   component: AppDashboard6Component,
      //   data: {
      //     title: 'Dashboard 6',
      //     urls: [
      //       {title: 'Dashboard', url: '/dashboards/dashboard1'},
      //       {title: 'Dashboard 6'},
      //     ],
      //   },
      // },
    ],
  },
];
