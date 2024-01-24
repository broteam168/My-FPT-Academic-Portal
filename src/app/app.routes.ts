import { Routes } from '@angular/router';
import { LoginComponent } from '../Views/AnonymousViews/Login/login.component';
import { UserComponent } from '../Views/AdminViews/user/user.component';
import { adminGuard } from '../Helpers/admin.guard';
import { AcademicComponent } from '../Views/AdminViews/academic/academic.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    
    canActivateChild: [adminGuard],
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'academic',
        component: AcademicComponent,
      }
    ],
  },
];
