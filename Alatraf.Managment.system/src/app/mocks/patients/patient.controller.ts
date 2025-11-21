import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { HttpRequest } from '@angular/common/http';
import { Patient, CreateUpdatePatientDto } from './patient.dto';

export function generatePatientId(patients: Patient[]): number {
  return patients.length
    ? Math.max(...patients.map((p) => p.patientId)) + 1
    : 1;
}

export class PatientController {
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

      const options: ResponseOptions = { status: 200, body: patients };
      return reqInfo.utils.createResponse$(() => options);
    } catch (error) {
      return reqInfo.utils.createResponse$(() => ({
        status: 500,
        body: {
          title: 'Mock Server Error',
          detail: 'Failed to load patients.',
        },
      }));
    }
  }
  static getById(reqInfo: RequestInfo) {
    try {
      const id = parseInt(reqInfo.id as string, 10);
      const collection = reqInfo.collection as Patient[];

      const patient = collection.find((p) => p.patientId === id);

      if (!patient) {
        return reqInfo.utils.createResponse$(() => ({
          status: 404,
          body: { title: 'Not Found', detail: 'Patient not found.' },
        }));
      }

      return reqInfo.utils.createResponse$(() => ({
        status: 200,
        body: patient,
      }));
    } catch (error) {
      return reqInfo.utils.createResponse$(() => ({
        status: 500,
        body: { title: 'Mock Error', detail: 'Failed to load patient.' },
      }));
    }
  }
  static create(reqInfo: RequestInfo) {
    try {
      const req = reqInfo.req as HttpRequest<CreateUpdatePatientDto>;
      const body = req.body;

      // Fix: Guard against null bodies
      if (!body) {
        return reqInfo.utils.createResponse$(() => ({
          status: 400,
          body: { title: 'Bad Request', detail: 'Request body is missing.' },
        }));
      }

      const collection = reqInfo.collection as Patient[];

      const newPatient = {
        patientId: generatePatientId(collection),
        fullname: body.fullname,
        birthdate: body.birthdate,
        phone: body.phone,
        nationalNo: body.nationalNo,
        address: body.address,
        gender: body.gender,
        patientType: body.patientType,
        autoRegistrationNumber: body.autoRegistrationNumber,
      } as Patient;

      collection.push(newPatient);

      return reqInfo.utils.createResponse$(() => ({
        status: 201,
        body: newPatient,
      }));
    } catch (error) {
      return reqInfo.utils.createResponse$(() => ({
        status: 500,
        body: { title: 'Mock Error', detail: 'Failed to create patient.' },
      }));
    }
  }

  static update(reqInfo: RequestInfo) {
    try {
      const req = reqInfo.req as HttpRequest<CreateUpdatePatientDto>;
      const body = req.body;
      const id = parseInt(reqInfo.id as string, 10);

      const collection = reqInfo.collection as Patient[];
      const index = collection.findIndex((p) => p.patientId === id);

      if (index === -1) {
        return reqInfo.utils.createResponse$(() => ({
          status: 404,
          body: { title: 'Not Found', detail: 'Patient not found.' },
        }));
      }

      collection[index] = { ...collection[index], ...body };

      return reqInfo.utils.createResponse$(() => ({
        status: 200,
        body: collection[index],
      }));
    } catch (error) {
      return reqInfo.utils.createResponse$(() => ({
        status: 500,
        body: { title: 'Mock Error', detail: 'Failed to update patient.' },
      }));
    }
  }

  static delete(reqInfo: RequestInfo) {
    try {
      const id = parseInt(reqInfo.id as string, 10);
      const collection = reqInfo.collection as Patient[];
      const index = collection.findIndex((p) => p.patientId === id);

      if (index === -1) {
        return reqInfo.utils.createResponse$(() => ({
          status: 404,
          body: { title: 'Not Found', detail: 'Patient not found.' },
        }));
      }

      collection.splice(index, 1);

      return reqInfo.utils.createResponse$(() => ({
        status: 204,
        body: {},
      }));
    } catch (error) {
      return reqInfo.utils.createResponse$(() => ({
        status: 500,
        body: { title: 'Mock Error', detail: 'Failed to delete patient.' },
      }));
    }
  }
}
