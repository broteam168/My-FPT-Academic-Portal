import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../Services/Common/auth.service';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export const adminGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  authService.refreshToken();
        
  return authService
  .verifyRole('ADMIN')
  .pipe(
    map((result) => {
     if(result.responseCode == 200 )return true ;
     // authService.logout();

      router.navigateByUrl('/login?token='+authService.currentUserValue?.token);
      return false;
    }),
    catchError(() => {
       router.navigateByUrl('/login');
       return EMPTY;
    })
  );
};
