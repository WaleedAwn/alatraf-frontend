import { Component, OnInit } from '@angular/core';
import { ApiResult } from '../../core/models/ApiResult';
import { CustomerModel } from '../../core/models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: CustomerModel[] = [];
  selectedCustomer?: CustomerModel;
  isLoading = false;
  errorMessage?: string;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = undefined;

    this.customerService.getAllCustomers().subscribe({
      next: (result: ApiResult<CustomerModel[]>) => {
        this.isLoading = false;
        if (result.isSuccess) {
          this.customers = result.data ?? [];
        } else {
          this.errorMessage = result.errorMessage ?? 'Failed to load customers.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Unexpected error occurred while fetching customers.';
        console.error('Customer Load Error:', err);
      }
    });
  }

  /**
   * Load single customer details
   */
  viewCustomer(id: string): void {
    this.isLoading = true;
    this.selectedCustomer = undefined;

    this.customerService.getCustomerById(id).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.isSuccess) {
          this.selectedCustomer = result.data!;
        } else {
          this.errorMessage = result.errorMessage ?? 'Customer not found.';
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.errorMessage = 'Failed to load customer details.';
        console.error('View Customer Error:', err);
      }
    });
  }

  clearSelection(): void {
    this.selectedCustomer = undefined;
    this.errorMessage = undefined;
  }}
