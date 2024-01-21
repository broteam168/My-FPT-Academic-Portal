import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  var current = authService.currentUserValue;
  console.log( current);
  return authService
  .verifyRole('ADMIN')
  .pipe(
    map((result) => {
     if(result.responseCode == 200 )return true ;
      router.navigateByUrl('/login');
      return false;
    })
  );
};
