import { Routes } from '@angular/router';
import { LoginComponent } from '../Views/AnonymousViews/Login/login.component';
import { UserComponent } from '../Views/AdminViews/user/user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin/user', component: UserComponent}
];
