import { Injectable, Signal, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private activeRequests = signal(0);

  // Exposed to components
  isLoading: Signal<boolean> = computed(() => this.activeRequests() > 0);

  show() {
    this.activeRequests.update(v => v + 1);
  }

  hide() {
    this.activeRequests.update(v => Math.max(0, v - 1));
  }
}
