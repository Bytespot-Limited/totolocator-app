import {NavItem} from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Harmony Admin',
    iconName: 'chart-pie',
    route: '/dashboards/harmony-admin',
  },
  {
    displayName: 'School Admin',
    iconName: 'chart-pie',
    route: '/dashboards/school-admin',
  },
  {
    displayName: 'Driver Dashboard',
    iconName: 'chart-pie',
    route: '/dashboards/driver',
  },
  {
    displayName: 'Guardian Dashboard',
    iconName: 'chart-pie',
    route: '/dashboards/guardian',
  },
  {
    navCap: 'Pages',
  },
  // =========== Beginning of actual sidebar ==========
  {
    displayName: 'Organizations',
    iconName: 'certificate',
    route: 'apps/organizations',
  },
  {
    displayName: 'Schools',
    iconName: 'certificate',
    route: 'apps/schools',
  },
  {
    displayName: 'Staff',
    iconName: 'users',
    route: 'apps/staff',
  },
  {
    displayName: 'Guardians',
    iconName: 'mood-boy',
    route: 'apps/guardians',
  },
  {
    displayName: 'Students',
    iconName: 'school',
    route: 'apps/students',
  },
  {
    displayName: 'Drivers',
    iconName: 'steering-wheel',
    route: 'apps/drivers',
  },
  {
    displayName: 'Vehicles',
    iconName: 'car',
    route: 'apps/vehicles',
  },
  {
    displayName: 'Trips',
    iconName: 'road',
    route: 'apps/trips',
  },
  {
    displayName: 'Terminals',
    iconName: 'device-ipad',
    route: 'apps/terminals',
  },
  {
    displayName: 'Invoices',
    iconName: 'file-invoice',
    route: 'apps/invoices',
  },
  {
    displayName: 'Notifications',
    iconName: 'message-2',
    route: 'apps/notifications',
  }
];
