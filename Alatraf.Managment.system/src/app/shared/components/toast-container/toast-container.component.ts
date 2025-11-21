import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [NgFor],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

}
