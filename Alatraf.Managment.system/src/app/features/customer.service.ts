import { Injectable } from '@angular/core';
import { BaseApiService } from '../core/services/base-api.service';
import { Observable } from 'rxjs';
import { ApiResult } from '../core/models/ApiResult';
import { CustomerModel } from '../core/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseApiService {

 
  getAllCustomers(): Observable<ApiResult<CustomerModel[]>> {
    return this.get<CustomerModel[]>('/customers');
  }

  getCustomerById(id: string): Observable<ApiResult<CustomerModel>> {
    return this.get<CustomerModel>(`/customers/${id}`);
  }
}
