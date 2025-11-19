import { Component, inject, input, signal } from '@angular/core';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../Services/patient.service';
import { ApiResult } from '../../../../../core/models/ApiResult';

@Component({
  selector: 'app-patient-add-edit-page',
  imports: [PatientFormComponent],
  templateUrl: './patient-add-edit-page.component.html',
  styleUrl: './patient-add-edit-page.component.css',
})
export class PatientAddEditPageComponent {
  private router = inject(Router);
  patientId = input<string>();
  private patientService = inject(PatientService);

  patientInfo = signal<Patient | undefined>(undefined);
  ngOnInit() {
    const id = Number(this.patientId());
    console.log(id);
    this.patientService.getPatients().subscribe({
      next: (result: ApiResult<Patient[]>) => {
        if (result.isSuccess) {
          let pa = result.data;

          this.patientInfo.set(pa?.find((p) => p.patientId === id));
          console.log(this.patientInfo());
        } else {
          console.log('Failed to load patients.');
        }
      },
      error: (err) => {
        // this.patients = err.body ?? [];
        console.error('Customer Load Error:', err);
      },
    });
  }
  onCancel() {
    this.closeModal();
  }
  private closeModal() {
    this.router.navigate(['../'], {
      replaceUrl: true,
    });
  }
}
