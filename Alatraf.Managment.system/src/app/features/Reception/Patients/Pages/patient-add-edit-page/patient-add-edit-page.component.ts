import { Component, inject } from '@angular/core';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-add-edit-page',
  imports: [PatientFormComponent],
  templateUrl: './patient-add-edit-page.component.html',
  styleUrl: './patient-add-edit-page.component.css',
})
export class PatientAddEditPageComponent {
  private router = inject(Router);
  onCancel() {
    this.closeModal();
  }
  private closeModal() {
    this.router.navigate(['../'], {
      replaceUrl: true,
    });
  }
}
