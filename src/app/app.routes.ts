import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { StudentComponent } from '../student/student.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'student', component: StudentComponent   }
];
