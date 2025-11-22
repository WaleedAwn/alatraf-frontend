import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Patient, CreateUpdatePatientDto } from './patient.dto';

export function generatePatientId(patients: Patient[]): number {
  return patients.length
    ? Math.max(...patients.map((p) => p.patientId)) + 1
    : 1;
}

export class PatientController {

  // --------------------------
  // GET ALL
  // --------------------------
  static getAll(reqInfo: RequestInfo) {
    try {
      let patients = reqInfo.collection as Patient[];
      const query = reqInfo.query;

      const patientType = query.get('patientType')?.[0];
      const gender = query.get('gender')?.[0];
      const searchTerm = query.get('searchTerm')?.[0]?.toLowerCase();

      if (patientType) {
        patients = patients.filter((p) => p.patientType === +patientType);
      }

      if (gender) {
        patients = patients.filter((p) => p.gender === (gender === 'true'));
      }

      if (searchTerm) {
        patients = patients.filter(
          (p) =>
            p.fullname.toLowerCase().includes(searchTerm) ||
            p.phone?.includes(searchTerm) ||
            p.nationalNo?.includes(searchTerm)
        );
      }

      return reqInfo.utils.createResponse$(() => ({
        status: 200,
        statusText: 'OK',
        body: patients,
      }));

    } catch (error) {
      return PatientController.mockError(reqInfo, 500, 'Failed to load patients.');
    }
  }

  // --------------------------
  // GET BY ID
  // --------------------------
  static getById(reqInfo: RequestInfo) {
    try {
      const id = parseInt(reqInfo.id as string, 10);
      const collection = reqInfo.collection as Patient[];

      const patient = collection.find((p) => p.patientId === id);

      if (!patient) {
        return PatientController.mockError(reqInfo, 404, 'Patient not found.');
      }

      return reqInfo.utils.createResponse$(() => ({
        status: 200,
        statusText: 'OK',
        body: patient,
      }));

    } catch (error) {
      return PatientController.mockError(reqInfo, 500, 'Failed to load patient.');
    }
  }

  // --------------------------
  // CREATE
  // --------------------------
  static create(reqInfo: RequestInfo) {
    try {
      const req = reqInfo.req as HttpRequest<CreateUpdatePatientDto>;
      const body = req.body;

      if (!body) {
        return PatientController.mockError(reqInfo, 400, 'Request body is missing.');
      }

      const collection = reqInfo.collection as Patient[];

      const newPatient: Patient = {
        patientId: generatePatientId(collection),
        fullname: body.fullname,
        birthdate: body.birthdate,
        phone: body.phone,
        nationalNo: body.nationalNo,
        address: body.address,
        gender: body.gender,
        patientType: body.patientType,
        autoRegistrationNumber: body.autoRegistrationNumber,
      };

      collection.push(newPatient);

      return reqInfo.utils.createResponse$(() => ({
        status: 201,
        statusText: 'Created',
        body: newPatient,
      }));

    } catch (error) {
      return PatientController.mockError(reqInfo, 500, 'Failed to create patient.');
    }
  }

  // --------------------------
  // UPDATE
  // --------------------------
  static update(reqInfo: RequestInfo) {
    try {
      const req = reqInfo.req as HttpRequest<CreateUpdatePatientDto>;
      const body = req.body;

      if (!body) {
        return PatientController.mockError(reqInfo, 400, 'Request body is missing.');
      }

      const id = parseInt(reqInfo.id as string, 10);
      const collection = reqInfo.collection as Patient[];
      const index = collection.findIndex((p) => p.patientId === id);

      if (index === -1) {
        return PatientController.mockError(reqInfo, 404, 'Patient not found.');
      }

      const updated = { ...collection[index], ...body } as Patient;
      collection[index] = updated;

      return reqInfo.utils.createResponse$(() => ({
        status: 200,
        statusText: 'OK',
        body: updated,
      }));

    } catch (error) {
      return PatientController.mockError(reqInfo, 500, 'Failed to update patient.');
    }
  }

  // --------------------------
  // DELETE
  // --------------------------

static delete(reqInfo: RequestInfo) {
  const id = parseInt(reqInfo.id as string, 10);
  const collection = reqInfo.collection as Patient[];
  const index = collection.findIndex(p => p.patientId === id);

  return reqInfo.utils.createResponse$(() => {

    // Simulate NOT FOUND error
    if (index === -1) {
      return {
        status: 200,   // Always return 200 for in-memory mock
        body: {
          isSuccess: false,
          errorMessage: "العنصر المطلوب غير موجود.",
          statusCode: 404
        }
      };
    }

    // Success case
    collection.splice(index, 1);

    return {
      status: 200,
      body: {
        isSuccess: true,
        data: {}
      }
    };
  });
}





  // --------------------------
  // COMMON ERROR BUILDER
  // --------------------------
  private static mockError(reqInfo: RequestInfo, status: number, detail: string) {
    return reqInfo.utils.createResponse$(() => ({
      status,
      statusText: 'Error',
      error: {
        title: status === 404 ? 'Not Found' : 'Mock Error',
        detail,
      },
    }));
  }
}
