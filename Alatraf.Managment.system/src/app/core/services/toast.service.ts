import { Injectable, signal } from '@angular/core';
import { ToastMessage, ToastType } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;

  // List of active toasts
  toasts = signal<ToastMessage[]>([]);

  show(message: string, type: ToastType = 'info', duration: number = 3000) {
    const id = ++this.counter;

    const toast: ToastMessage = { id, message, type, duration };

    this.toasts.update((list) => [...list, toast]);

    // Auto-remove
    setTimeout(() => this.remove(id), duration+500);
  }

  success(message: string) {
    this.show(message, 'success', 2500);
  }

  error(message: string) {
    this.show(message, 'error', 5000);
  }

  warning(message: string) {
    this.show(message, 'warning', 3500);
  }

  info(message: string) {
    this.show(message, 'info', 3000);
  }

  remove(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
