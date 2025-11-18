import { Component, output } from '@angular/core';

@Component({
  selector: 'app-patient-form',
  imports: [],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  close = output();

  onClose() {
    this.close.emit();
  }
}
