import { map, tap } from 'rxjs/operators';
import { computed, Injectable, signal } from '@angular/core';
import { BaseApiService } from '../../../../core/services/base-api.service';
import {
  CreateUpdatePatientDto,
  Patient,
  PatientFilterDto,
} from '../models/patient.model';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../core/models/ApiResult';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends BaseApiService {
  private endpoint = '/patients';

   private patients = signal<Patient[]>([]);

  loadedPatients = this.patients.asReadonly();

  getPatients(filters?: PatientFilterDto): Observable<ApiResult<Patient[]>> {
    let params = new HttpParams();
    if (filters?.patientType !== undefined)
      params = params.set('patientType', filters.patientType.toString());
    if (filters?.gender !== undefined)
      params = params.set('gender', filters.gender.toString());
    if (filters?.searchTerm)
      params = params.set('searchTerm', filters.searchTerm);

    return this.get<Patient[]>(this.endpoint, params).pipe(
      tap((patients) => {
        if (patients.isSuccess && patients.data) {
          this.patients.set(patients.data);
        }
      })
    );
  }


  getPatientById(id: number): Observable<ApiResult<Patient>> {
    return this.get<Patient>(`${this.endpoint}/${id}`);
  }

  // CREATE a new patient
  createPatient(dto: CreateUpdatePatientDto): Observable<ApiResult<Patient>> {
    return this.post<Patient>(this.endpoint, dto);
  }

  // UPDATE an existing patient
  updatePatient(
    id: number,
    dto: CreateUpdatePatientDto
  ): Observable<ApiResult<Patient>> {
    return this.put<Patient>(`${this.endpoint}/${id}`, dto);
  }

  // DELETE a patient
  deletePatient(id: number): Observable<ApiResult<void>> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}
