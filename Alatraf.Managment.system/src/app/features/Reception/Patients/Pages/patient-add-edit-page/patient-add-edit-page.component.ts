import {
  Component,
  inject,
  input,
  signal,
  OnChanges,
  DestroyRef,
} from '@angular/core';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { Router } from '@angular/router';
import { CreateUpdatePatientDto, Patient } from '../../models/patient.model';
import { PatientService } from '../../Services/patient.service';

@Component({
  selector: 'app-patient-add-edit-page',
  imports: [PatientFormComponent],
  templateUrl: './patient-add-edit-page.component.html',
  styleUrl: './patient-add-edit-page.component.css',
})
export class PatientAddEditPageComponent {
  private router = inject(Router);
  private patientService = inject(PatientService);

  private destroyRef = inject(DestroyRef);

  patientId = input<string>();
  isEditMode = signal<boolean>(false);
  patientInfo = signal<Patient | undefined>(undefined);

  ngOnInit() {
    const id = Number(this.patientId());
    console.log(id);
    if (!isNaN(id)) {
      this.isEditMode.set(true);

      const subscription = this.patientService.getPatientById(id).subscribe({
        next: (result) => {
          if (result.isSuccess && result.data) {
            this.patientInfo.set(result.data);
          } else {
            console.error('Patient not found or API error', result);
          }
        },
        error: (err) => {
          console.error('API error', err);
          this.isEditMode.set(false);
        },
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  OnSavePatient(newpatien: CreateUpdatePatientDto) {
    if (this.isEditMode()) {

      
    }

    console.log(newpatien);
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
