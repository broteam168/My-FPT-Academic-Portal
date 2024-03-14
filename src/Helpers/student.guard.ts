import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../Services';
import { EMPTY, catchError, map } from 'rxjs';

export const studentGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  authService.refreshToken();

  return authService.verifyRole('STUDENT').pipe(
    map(result => {
      if (result.responseCode == 200) {
        return true;
      }

      router.navigateByUrl('/login?token=' + authService.currentUserValue?.token);
      return false;
    }),
    catchError(() => {
      router.navigateByUrl('/login');
      return EMPTY;
    })
  );
};
