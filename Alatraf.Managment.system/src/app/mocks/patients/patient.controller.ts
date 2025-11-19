import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { HttpRequest } from '@angular/common/http';
import { Patient, PatientType, CreateUpdatePatientDto } from './patient.dto';

export function generatePatientId(patients: Patient[]): number {
  return patients.length
    ? Math.max(...patients.map((p) => p.patientId)) + 1
    : 1;
}

export class PatientController {
  static getAll(reqInfo: RequestInfo) {
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

    const options: ResponseOptions = { body: patients };
    return reqInfo.utils.createResponse$(() => options);
  }

  static getById(reqInfo: RequestInfo) {
  const id = parseInt(reqInfo.id as string, 10); // get id from URL
  const collection = reqInfo.collection as Patient[];

  const patient = collection.find(p => p.patientId === id);

  const options = { body: patient  }; // return null if not found
  return reqInfo.utils.createResponse$(() => options);
}


  static create(reqInfo: RequestInfo) {
    const req = reqInfo.req as HttpRequest<CreateUpdatePatientDto>;
    const body = req.body;
    const collection = reqInfo.collection as Patient[];

    const newPatient: Patient = {
      ...body,
      patientId: generatePatientId(collection),
    } as Patient;

    collection.push(newPatient);

    const options: ResponseOptions = { body: newPatient };
    return reqInfo.utils.createResponse$(() => options);
  }

  static update(reqInfo: RequestInfo) {
    const req = reqInfo.req as HttpRequest<CreateUpdatePatientDto>;
    const body = req.body;
    const id = parseInt(reqInfo.id as string, 10);

    const collection = reqInfo.collection as Patient[];
    const index = collection.findIndex((p) => p.patientId === id);

    if (index > -1) {
      collection[index] = { ...collection[index], ...body };
    }

    const options: ResponseOptions = { body: collection[index] };
    return reqInfo.utils.createResponse$(() => options);
  }

  static delete(reqInfo: RequestInfo) {
    const id = parseInt(reqInfo.id as string, 10);
    const collection = reqInfo.collection as Patient[];
    const index = collection.findIndex((p) => p.patientId === id);

    if (index > -1) {
      collection.splice(index, 1);
    }

    const options: ResponseOptions = { body: {} };
    return reqInfo.utils.createResponse$(() => options);
  }
}
