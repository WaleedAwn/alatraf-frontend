import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiResponseInterceptor } from './core/interceptors/api-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    // provideHttpClient(withInterceptors([apiResponseInterceptor]))
  ],
};

// [authInterceptor,apiResponseInterceptor]
