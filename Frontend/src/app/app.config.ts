import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ErrorInterceptor } from '../Helpers/auth.interceptor';
import { JwtInterceptor } from '../Helpers/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  importProvidersFrom(HttpClientModule),provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
};
