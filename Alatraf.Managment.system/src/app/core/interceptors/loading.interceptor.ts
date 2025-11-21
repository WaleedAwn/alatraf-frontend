import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  // Check custom header and skip show the loading for  specific  requests that put the "'X-Skip-Loader') === 'true'"
  const skipLoader = req.headers.get('X-Skip-Loader') === 'true';

  if (!skipLoader) {
    loadingService.show();
  }
  return next(req).pipe(
    finalize(() => {
      if (!skipLoader) {
        loadingService.hide();
      }
    })
  );
};
