import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export const adminGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
 
  return authService
  .verifyRole('ADMIN')
  .pipe(
    map((result) => {
     if(result.responseCode == 200 )return true ;
      authService.logout();
      router.navigateByUrl('/login');
      return false;
    }),
    catchError(() => {
       router.navigateByUrl('/login');
       return EMPTY;
    })
  );
};
