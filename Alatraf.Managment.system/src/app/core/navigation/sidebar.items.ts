import { PERMISSIONS } from './../constants/permissions';

export interface MenuItem {
  label: string;              // Name of the menu item
  icon?: string;              // Default icon
  activeIcon?: string;        // Icon when the menu item is active
  route: string;              // Angular route path
  requiredPermissions: string[]; // Permissions needed to see/access this item
}



export interface MenuCategory {
  category: string; // Category name
  CateRoute?: string; // Optional icon
  items: MenuItem[]; // Array of items in this category
}

export const MENU_CONFIG: MenuCategory[] = [
  {
    category: 'Registration',
    CateRoute: '/regestration',
    items: [
      {
        label: 'Add Patient',
        icon: '',
        route: '/patients/add',
        requiredPermissions: [PERMISSIONS.PATIENTS.ADD],
      },
      {
        label: 'Patient List',
        icon: '',

        route: '/patients/view',
        requiredPermissions: [PERMISSIONS.PATIENTS.VIEW],
      },
    ],
  },
];
