import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ArabicClientErrors } from '../locals/Arabic';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private toast = inject(ToastService);

  handleError(error: any): void {
    console.error('Uncaught Angular Error:', error);
    this.toast.error(ArabicClientErrors.unknown);
  }
}
