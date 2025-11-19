import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PatientsListComponent } from '../../components/patients.list/patients.list.component';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../Services/patient.service';
import { ApiResult } from '../../../../../core/models/ApiResult';

@Component({
  selector: 'app-patients-page',
  imports: [PatientsListComponent, RouterLink, RouterOutlet],
  templateUrl: './patients.page.component.html',
  styleUrl: './patients.page.component.css',
})
export class PatientsPageComponent implements OnInit {
  patients: Patient[] = [];

  private patientService = inject(PatientService);

  ngOnInit() {
    this.loadCustomers()
  }


    loadCustomers(): void {

    this.patientService.getPatients().subscribe({
      next: (result: ApiResult<Patient[]>) => {
        if (result.isSuccess) {
          this.patients = result.data ?? [];
        } else {
          console.log( 'Failed to load patients.');
        }
      },
      error: (err) => {
          // this.patients = err.body ?? [];

        console.error('Customer Load Error:', err);
      }
    });
  }
}
