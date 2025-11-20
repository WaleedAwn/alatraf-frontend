import { Routes } from '@angular/router';

export const ReceptionRoutes: Routes = [
  {
    path: 'patients',
    loadComponent: () =>
      import('./Patients/Pages/patients.page/patients.page.component').then(
        (m) => m.PatientsPageComponent
      ),
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import(
            './Patients/Pages/patient-add-edit-page/patient-add-edit-page.component'
          ).then((m) => m.PatientAddEditPageComponent),
      },
      {
        path: 'edit/:patientId',
        loadComponent: () =>
          import(
            './Patients/Pages/patient-add-edit-page/patient-add-edit-page.component'
          ).then((m) => m.PatientAddEditPageComponent),
      },
    ],
  },
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
];
