import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PatientsListComponent } from '../../components/patients.list/patients.list.component';
import { Patient, PatientFilterDto } from '../../models/patient.model';
import { PatientService } from '../../Services/patient.service';
import { ApiResult } from '../../../../../core/models/ApiResult';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-page',
  imports: [PatientsListComponent, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './patients.page.component.html',
  styleUrl: './patients.page.component.css',
})
export class PatientsPageComponent implements OnInit {
  private patientService = inject(PatientService);

  patients = this.patientService.loadedPatients;
  searchText = signal<string>('');
  debouncedSearchText = signal<string>('');
  // فلترة المرضى باستخدام النص بعد الـ debounce
  // filteredPatients = computed(() => {
  //   const term = this.debouncedSearchText().toLowerCase();
  //   if (!term) return this.patients();

  //   return this.patients().filter(
  //     (patient) =>
  //       patient.fullname.toLowerCase().includes(term) ||
  //       patient.phone?.toLowerCase().includes(term)
  //   );
  // });

  private debounceTimer: any;
  filters: PatientFilterDto = {};

  constructor() {
    effect(() => {
      const value = this.searchText();
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.filters.searchTerm = value;
        this.loadAllPatients(this.filters);
      }, 1000);
    });
  }

  ngOnInit() {
    this.loadAllPatients(this.filters);
  }

  loadAllPatients(patientFilter: PatientFilterDto): void {
    this.patientService.getPatients(patientFilter).subscribe({
      next: (result: ApiResult<Patient[]>) => {
        if (result.isSuccess) {
          // this.patients = result.data ?? [];
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

  onSearch(value: string) {
    this.searchText.set(value);
  }
}
