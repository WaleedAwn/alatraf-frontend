import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SkeletonsLoadingService {

  // Track number of active page-level GET requests
  private pageRequestCount = signal(0);

  // Public signal for skeleton components
  isLoading = computed(() => this.pageRequestCount() > 0);

  // Called by the PageLoadingInterceptor
  start() {
    this.pageRequestCount.update(count => count + 1);
  }

  // Called by the PageLoadingInterceptor
  stop() {
    this.pageRequestCount.update(count => Math.max(0, count - 1));
  }

  // Optional helper
  reset() {
    this.pageRequestCount.set(0);
  }
}
