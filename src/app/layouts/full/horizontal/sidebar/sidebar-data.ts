import {NavItem} from '../../vertical/sidebar/nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboards',
    iconName: 'home',
    route: 'dashboards',
    children: [
      {
        displayName: 'Harmony Admin',
        iconName: 'point',
        route: '/dashboards/harmony-admin',
      },
      {
        displayName: 'School Admin',
        iconName: 'point',
        route: '/dashboards/school-admin',
      },
      {
        displayName: 'Driver Dashboard',
        iconName: 'point',
        route: '/dashboards/driver',
      },
      {
        displayName: 'Guardian Dashboard',
        iconName: 'point',
        route: '/dashboards/guardian',
      }
    ],
  },
  {
    displayName: 'Pages',
    iconName: 'apps',
    route: 'apps',
    ddType: '',
    children: [
      {
        displayName: 'Organizations',
        iconName: 'point',
        route: 'apps/organizations',
      },
      {
        displayName: 'Schools',
        iconName: 'point',
        route: 'apps/schools',
      },
      {
        displayName: 'Employees',
        iconName: 'point',
        route: 'apps/employees',
      },
      {
        displayName: 'Guardians',
        iconName: 'point',
        route: 'apps/guardians',
      },
      {
        displayName: 'Students',
        iconName: 'point',
        route: 'apps/students',
      },
      {
        displayName: 'Drivers',
        iconName: 'point',
        route: 'apps/drivers',
      },
      {
        displayName: 'Vehicles',
        iconName: 'point',
        route: 'apps/vehicles',
      },
      {
        displayName: 'Trips',
        iconName: 'point',
        route: 'apps/trips',
      },
      {
        displayName: 'Terminals',
        iconName: 'point',
        route: 'apps/terminals',
      },
      {
        displayName: 'Invoices',
        iconName: 'point',
        route: 'apps/invoices',
      },
      {
        displayName: 'Notifications',
        iconName: 'point',
        route: 'apps/notifications',
      }
    ],
  }
];
