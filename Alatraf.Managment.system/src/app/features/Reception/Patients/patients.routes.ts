import { Routes } from '@angular/router';
import { PatientsListComponent } from './components/patients.list/patients.list.component';
import { PatientsPageComponent } from './Pages/patients.page/patients.page.component';

export const PatientsRoutes: Routes = [
  { path: 'view', component: PatientsPageComponent },
];
