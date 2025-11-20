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
import {
  CreateUpdatePatientDto,
  PatientType,
} from '../../models/patient.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
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
      phone: ['', Validators.required],
      address: [''],
      nationalNo: [''],
      patientType: [PatientType.Normal, Validators.required],
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
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose() {
    this.closeDialog();
  }
  backdropClick() {
    this.closeDialog();
  }

  closeDialog() {
    this.close.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  private formatDate(date: string | null | undefined): string | null {
    if (!date) return null;

    const d = new Date(date);
    if (isNaN(d.getTime())) return null;

    // Format: YYYY-MM-DD
    return d.toISOString().split('T')[0];
  }
}
