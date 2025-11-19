// Backend-like stored model
export interface Patient {
  patientId: number;
  fullname: string;
  birthdate?: string;  // ISO string format
  phone?: string;
  nationalNo?: string;
  address?: string;
  gender: boolean;
  patientType: PatientType;
  autoRegistrationNumber?: string;
}

export enum PatientType {
  Normal = 0,
  Wounded = 1
}

// Request DTO for create/update (same as backend DTO)
export interface CreateUpdatePatientDto {
  fullname: string;
  birthdate?: string;
  phone?: string;
  nationalNo?: string;
  address?: string;
  gender: boolean;
  patientType: PatientType;
  autoRegistrationNumber?: string;
}

// Filter DTO for listing patients
export interface PatientFilterDto {
  patientType?: PatientType;
  gender?: boolean;
  searchTerm?: string;
}

// Response DTO (can be different if needed for UI)
export interface PatientResponse {
  patientId: number;
  fullname: string;
  birthdate?: string;
  phone?: string;
  gender: boolean;
  patientType: PatientType;
  autoRegistrationNumber?: string;
}
