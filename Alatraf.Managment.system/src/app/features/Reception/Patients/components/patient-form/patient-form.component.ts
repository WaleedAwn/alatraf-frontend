import {
  Component,
  input,
  output,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CreateUpdatePatientDto } from '../../models/patient.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent implements OnChanges, OnInit {
  patient = input.required<CreateUpdatePatientDto | undefined>();

  close = output();
  save = output<CreateUpdatePatientDto>();
  mode = input.required<boolean>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      autoRegistrationNumber: [''],
      fullname: ['', Validators.required],
      gender: [true, Validators.required],
      birthdate: [''],
      phone: [''],
      address: [''],
      nationalNo: [''],
      patientType: [0, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient() && this.form) {
      const p = this.patient()!;

      this.form.patchValue({
        ...p,
        birthdate: this.formatDate(p.birthdate),
      });
    }
  }
  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value as CreateUpdatePatientDto);
    }
  }

  onClose() {
    this.close.emit();
  }

  private formatDate(date: string | null | undefined): string | null {
    if (!date) return null;

    const d = new Date(date);
    if (isNaN(d.getTime())) return null;

    // Format: YYYY-MM-DD
    return d.toISOString().split('T')[0];
  }
}
