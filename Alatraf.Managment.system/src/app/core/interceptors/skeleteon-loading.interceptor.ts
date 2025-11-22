import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SkeletonsLoadingService } from '../services/skeletons-loading.service';

export const SkeletonLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const pageLoader = inject(SkeletonsLoadingService);
  const isGetRequest = req.method === 'GET';

  // const skip = req.headers.get('X-Skip-Page-Loader') === 'true';

  // if (isGetRequest && !skip) {
  pageLoader.start();
  // }

  return next(req).pipe(
    finalize(() => {
      // if (isGetRequest && !skip) {
      pageLoader.stop();
      // }
    })
  );
};
