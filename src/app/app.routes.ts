import { Routes } from '@angular/router';
import { LoginComponent } from '../Views/AnonymousViews/Login/login.component';
import { UserComponent } from '../Views/AdminViews/user/user.component';
import { adminGuard } from '../Helpers/admin.guard';
import { AcademicComponent } from '../Views/AdminViews/academic/academic.component';
import { UnitComponent } from '../Views/AdminViews/unit/unit.component';
import { UnitdetailComponent } from '../Views/AdminViews/unit/unitdetail/unitdetail.component';
import { AddunitComponent } from '../Views/AdminViews/unit/addunit/addunit.component';
import { EditunitComponent } from '../Views/AdminViews/unit/editunit/editunit.component';
import { ClassComponent } from '../Views/AdminViews/unit/class/class.component';
import { AddclassComponent } from '../Views/AdminViews/unit/class/addclass/addclass.component';
import { EditclassComponent } from '../Views/AdminViews/unit/class/editclass/editclass.component';
import { MajorComponent } from '../Views/AdminViews/major/major.component';
import { AddmajorComponent } from '../Views/AdminViews/major/addmajor/addmajor.component';
import { MajordetailComponent } from '../Views/AdminViews/major/majordetail/majordetail.component';

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
      },
      {
        path: 'unit',
        component: UnitComponent,
      },
      
      {
        path: 'unit/school/add',
        component: AddunitComponent,
        pathMatch:'full'
      },
      {
        path: 'unit/school/:id/class/:id2/edit',
        component: EditclassComponent,
        pathMatch:"full"
      },
      {
        path: 'unit/school/:id/class/add',
        component: AddclassComponent,
        pathMatch:"full"
      },
      {
        path: 'unit/school/:id/class',
        component: ClassComponent,
        pathMatch:"full"
      },
      {
        path: 'unit/school/:id/edit',
        component: EditunitComponent,
        pathMatch:"full"
      },
      {
        path: 'unit/school/:id',
        component: UnitdetailComponent,
        pathMatch:"full"
      },
      {
        path: 'major/add',
        component: AddmajorComponent,
        pathMatch:"full"
      },
      {
        path: 'major/:id',
        component: MajordetailComponent,
        pathMatch:"full"
      },
      {
        path: 'major',
        component: MajorComponent,
        pathMatch:"full"
      },
    ],
  },
];
