import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { PATIENTS_MOCK_DATA } from './patients/patient.mock';
import { PatientController } from './patients/patient.controller';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      patients: PATIENTS_MOCK_DATA,
    };
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'patients') {
      if (reqInfo.id) {
        // If URL contains an ID, return single patient
        return PatientController.getById(reqInfo);
      } else {
        // Otherwise return all patients
        return PatientController.getAll(reqInfo);
      }
    }
    return undefined;
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'patients') {
      return PatientController.create(reqInfo);
    }
    return undefined;
  }

  put(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'patients') {
      return PatientController.update(reqInfo);
    }
    return undefined;
  }

  delete(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'patients') {
      return PatientController.delete(reqInfo);
    }
    return undefined;
  }
}
