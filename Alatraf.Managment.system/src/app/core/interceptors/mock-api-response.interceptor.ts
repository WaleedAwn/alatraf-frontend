import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ApiResult } from '../models/ApiResult';
import { of } from 'rxjs';

export const mockApiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: any) => {
      const apiResult = ApiResult.success(error.body);
      const response = new HttpResponse({
        body: apiResult,
        status: error?.status || 0,
      });

      return of(response);
    })
  );
};
