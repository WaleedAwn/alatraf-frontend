import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'registration',
    loadChildren: () =>
      import('./features/Reception/registration.routes').then(
        (m) => m.ReceptionRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'registration',
    pathMatch: 'full',
  },
];
