import {NavItem} from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Harmony Admin',
    iconName: 'chart-pie',
    route: '/dashboards/harmony-admin',
    roles: ['ROLE_ADMIN'],
  },
  {
    displayName: 'School Admin',
    iconName: 'chart-pie',
    route: '/dashboards/school-admin',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
  },
  {
    displayName: 'Driver Dashboard',
    iconName: 'chart-pie',
    route: '/dashboards/driver',
    roles: ['ROLE_ADMIN', 'ROLE_DRIVER'],
  },
  {
    displayName: 'Guardian Dashboard',
    iconName: 'chart-pie',
    route: '/dashboards/guardian',
    roles: ['ROLE_ADMIN', 'ROLE_GUARDIAN'],
  },
  {
    navCap: 'Pages',
  },
  {
    displayName: 'Organizations',
    iconName: 'certificate',
    route: 'apps/organizations',
    roles: ['ROLE_ADMIN'],
  },
  {
    displayName: 'Schools',
    iconName: 'certificate',
    route: 'apps/schools',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
  },
  {
    displayName: 'Staff',
    iconName: 'users',
    route: 'apps/staff',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
  },
  {
    displayName: 'Guardians',
    iconName: 'mood-boy',
    route: 'apps/guardians',
    roles: ['ROLE_ADMIN', 'ROLE_GUARDIAN'],
  },
  {
    displayName: 'Students',
    iconName: 'school',
    route: 'apps/students',
    roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUARDIAN'],
  },
  {
    displayName: 'Drivers',
    iconName: 'steering-wheel',
    route: 'apps/drivers',
    roles: ['ROLE_ADMIN', 'ROLE_DRIVER'],
  },
  {
    displayName: 'Vehicles',
    iconName: 'car',
    route: 'apps/vehicles',
    roles: ['ROLE_ADMIN', 'ROLE_DRIVER'],
  },
  {
    displayName: 'Trips',
    iconName: 'road',
    route: 'apps/trips',
    roles: ['ROLE_ADMIN', 'ROLE_DRIVER'],
  },
  {
    displayName: 'Terminals',
    iconName: 'device-ipad',
    route: 'apps/terminals',
    roles: ['ROLE_ADMIN'],
  },
  {
    displayName: 'Invoices',
    iconName: 'file-invoice',
    route: 'apps/invoices',
    roles: ['ROLE_ADMIN'],
  },
  {
    displayName: 'Notifications',
    iconName: 'message-2',
    route: 'apps/notifications',
    roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GUARDIAN', 'ROLE_DRIVER'],
  },
];
