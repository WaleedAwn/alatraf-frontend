import { PERMISSIONS } from '../models/constants/permissions';

export interface MenuItem {
  label: string; // Name of the menu item
  icon?: string; // Default icon
  activeIcon?: string; // Icon when the menu item is active
  route: string; // Angular route path
  requiredPermissions: string[]; // Permissions needed to see/access this item
}

export interface MenuCategory {
  category: string; // Category name
  CateRoute?: string; // Optional icon
  items: MenuItem[]; // Array of items in this category
}

export const MENU_CONFIG: MenuCategory[] = [
  {
    category: 'الاستقبال',
    CateRoute: 'registration',
    items: [
      {
        label: 'إدارة المرضى',
        icon: 'assets/icons/user-icon-w.svg',
        route: '/registration/patients',
        requiredPermissions: [PERMISSIONS.PATIENTS.ADD],
      },
      {
        label: 'عرض المرضى ',
        icon: 'assets/icons/user-icon-w.svg',

        route: '/registration/dfghn',
        requiredPermissions: [PERMISSIONS.PATIENTS.VIEW],
      },
    ],
  },
];
