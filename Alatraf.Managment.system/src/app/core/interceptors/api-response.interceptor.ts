import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResult } from '../models/ApiResult';
import { handleErrorResponse } from '../helpers/handle-error-response';
import { handleException } from '../helpers/handle-exception';
export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOWE1OTEyOS02YzIwLTQxN2EtODM0ZC0xMWEyMDhkMzJkOTYiLCJlbWFpbCI6InBtQGxvY2FsaG9zdCIsInJvbGUiOiJNYW5hZ2VyIiwibmJmIjoxNzYyNjMzMDc5LCJleHAiOjE3NjI2MzQ4NzksImlhdCI6MTc2MjYzMzA3OSwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0.FbS9tWmINQrjbouiXWGS1ra0WmKssjfyfhHmhQfPZD8';
  // const updatedReq = req.clone({
  //   setHeaders: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const apiResult = ApiResult.success(event.body);

        
        return event.clone({ body: apiResult });
      }
      return event;
    }),
    catchError((error: any) => {
      let apiResult;
      if (error instanceof HttpErrorResponse) {
        apiResult = handleErrorResponse(error);
      } else {
        apiResult = handleException(error);
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
