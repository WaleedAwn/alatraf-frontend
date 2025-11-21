import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mocks/in-memory-data.service';
import { mockApiResponseInterceptor } from './core/interceptors/mock-api-response.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { SkeletonLoadingInterceptor } from './core/interceptors/skeleteon-loading.interceptor';
import { apiResponseInterceptor } from './core/interceptors/api-response.interceptor';
import { GlobalErrorHandler } from './core/errors/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideHttpClient(
      withInterceptors([
        SkeletonLoadingInterceptor,
        loadingInterceptor,
        // mockApiResponseInterceptor,
        apiResponseInterceptor,
      ])
    ),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        delay: 500,
        passThruUnknownUrl: true,
      })
    ),
  ],
};
