import { Routes } from '@angular/router';
import { LoginComponent } from '../Views/AnonymousViews/Login/login.component';
import { UserComponent } from '../Views/AdminViews/user/user.component';
import { adminGuard } from '../Helpers/admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: UserComponent , canActivate: [adminGuard]}
    ,
    { path: 'admin/user', component: UserComponent , canActivate: [adminGuard]}
];
