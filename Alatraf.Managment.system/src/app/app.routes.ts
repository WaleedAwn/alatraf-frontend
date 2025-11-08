import { Routes } from '@angular/router';
import { CustomerComponent } from './features/customer/customer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent },
  { path: '**', redirectTo: 'login' },
];
