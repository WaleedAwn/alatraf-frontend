import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PatientsListComponent } from '../../components/patients.list/patients.list.component';
import {
  Patient,
  PatientFilterDto,
  PatientType,
} from '../../models/patient.model';
import { PatientService } from '../../Services/patient.service';
import { ApiResult } from '../../../../../core/models/ApiResult';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../../../../shared/components/dialog/dialog.service';
import {
  DialogConfig,
  DialogType,
} from '../../../../../shared/components/dialog/DialogConfig';
import { debounceTime, filter, Subject, switchMap } from 'rxjs';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-patients-page',
  imports: [PatientsListComponent, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './patients.page.component.html',
  styleUrl: './patients.page.component.css',
})
export class PatientsPageComponent implements OnInit {
  private patientService = inject(PatientService);
  private dialogService = inject(DialogService);
  private toast = inject(ToastService);
  patients = signal<Patient[]>([]);
  searchText = new Subject<string>();
  filters: PatientFilterDto = {};
  PatientType = PatientType;
  ngOnInit() {
    // Listen to search input with debounce
    this.searchText
      .pipe(
        debounceTime(300), // wait 300ms after last key
        switchMap((term) => {
          // switch to new API call
          this.filters.searchTerm = term;
          return this.patientService.getPatients(this.filters);
        })
      )
      .subscribe({
        next: (result: ApiResult<Patient[]>) => {
          if (result.isSuccess) {
            this.patients.set(result.data ?? []);
          }
        },
        error: (err) => console.error(err),
      });

    // Initial load
    this.loadAllPatients();
  }

  onSearch(term: string) {
    this.searchText.next(term); // pushes new value to debounced observable
  }

  loadAllPatients() {
    this.patientService.getPatients(this.filters).subscribe({
      next: (result) => {
        if (result.isSuccess) this.patients.set(result.data ?? []);
      },
      error: (err) => console.error(err),
    });
  }

  onDeletePatient(patient: Patient) {
    const config: DialogConfig = {
      title: 'حذف بيانات المريض',
      message: 'هل أنت متأكد من حذف بيانات المريض التالية؟',
      payload: {
        'رقم المريض': patient.nationalNo,
        الاسم: patient.fullname,
        // ' رقم الهاتف': patient.phone,
      },
    };

    this.dialogService.confirmDelete(config).subscribe((confirmed) => {
      if (confirmed) {
        this.patientService.deletePatient(patient.patientId).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              // this.loadAllPatients(this.filters);
              this.toast.success('تم حذف البيانات بنجاح');
            }
          },
          error: (error) => {
            this.toast.error('حدث خطأ أثناء الحذف.');

            // this.dialogService
            //   .confirm({
            //     title: 'خطأ',
            //     message: 'حدث خطأ أثناء الحذف.',
            //     type: DialogType.Warning,
            //     confirmText: 'موافق',
            //     showCancel: false,
            //   })
            //   .subscribe();
          },
        });
      }
    });
  }

  // Optional: filter changes (gender, patientType)
  onFilterChange(filter: Partial<PatientFilterDto>) {
    Object.assign(this.filters, filter);
    this.loadAllPatients();
  }
}
