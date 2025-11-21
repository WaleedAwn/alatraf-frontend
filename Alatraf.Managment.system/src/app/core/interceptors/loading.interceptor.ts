import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
 // NEW LOGIC:
  // Loader is triggered ONLY when header 'X-Enable-Loader' === 'true'
  const enableLoader = req.headers.get('X-Enable-Loader') === 'true';

  if (enableLoader) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (enableLoader) {
        loadingService.hide();
      }
    })
  );
};
