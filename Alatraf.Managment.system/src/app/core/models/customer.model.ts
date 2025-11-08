import { VehicleModel } from './vehicle.model';

export interface CustomerModel {
  customerId: string; // Guid → string
  name?: string;
  phoneNumber?: string;
  email?: string;
  vehicles: VehicleModel[];
}

