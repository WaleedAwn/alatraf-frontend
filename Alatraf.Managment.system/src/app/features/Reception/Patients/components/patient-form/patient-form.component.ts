import { Component, input, output } from '@angular/core';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-form',
  imports: [],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  patient = input.required<Patient | undefined>();
  close = output();

  onClose() {
    this.close.emit();
  }
}
