import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ApiResult } from '../models/ApiResult';
import { ToastService } from '../services/toast.service';
import { catchError, map, of } from 'rxjs';
import { handleException } from '../errors/helpers/handle-exception';
import { handleErrorResponse } from '../errors/helpers/handle-error-response';
export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        // ---------------------------------------------------------
        // 🔥 1. Handle Mock API Errors (In-Memory Web API)
        // ---------------------------------------------------------

        if (body && body.isSuccess === false) {
          if (body.errorMessage) {
            toast.error(body.errorMessage);
          }

          // Do NOT wrap again — just return the ApiResult-like body
          return event.clone({ body });
        }

        
        const apiResult = ApiResult.success(event.body);
        const successMsg = req.headers.get('X-Success-Toast');
        if (successMsg) {
          toast.success(successMsg);
        }

        return event.clone({ body: apiResult });
      }
      return event;
    }),

    catchError((error: any) => {
      let apiResult;
      if (error instanceof HttpErrorResponse) {
        apiResult = handleErrorResponse(error);
        if (apiResult.errorMessage) {
          toast.error(apiResult.errorMessage);
        }
      } else {
        apiResult = handleException(error);
        if (apiResult.errorMessage) {
          toast.error(apiResult.errorMessage);
        }
      }

      if (!environment.production) {
        console.error('Intercepted API Error:', apiResult);
      }

      // Convert the error into a successful HttpResponse carrying ApiResult
      const response = new HttpResponse({
        body: apiResult,
        status: error?.status || 0,
      });

      return of(response);
    })
  );
};
