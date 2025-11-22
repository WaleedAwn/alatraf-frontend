import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';
import { SkeletonsLoadingService } from '../../../../../core/services/skeletons-loading.service';

@Component({
  selector: 'app-patients-list',
  imports: [RouterLink, SkeletonComponent],
  standalone: true,
  templateUrl: './patients.list.component.html',
  styleUrl: './patients.list.component.css',
})
export class PatientsListComponent {
  patients = input.required<Patient[]>();
  pageLoader = inject(SkeletonsLoadingService);

  // Display 8 skeleton rows
  skeletonRows = Array.from({ length: 8 }).map((_, i) => i);

  deletePatient = output<Patient>();
  onDeleteClick(patient: Patient) {
    this.deletePatient.emit(patient);
  }
}
