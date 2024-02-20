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
import { EditmajorComponent } from '../Views/AdminViews/major/editmajor/editmajor.component';
import { SubmajorComponent } from '../Views/AdminViews/major/submajor/submajor.component';
import { AddsubmajorComponent } from '../Views/AdminViews/major/submajor/addsubmajor/addsubmajor.component';
import { EditsubmajorComponent } from '../Views/AdminViews/major/submajor/editsubmajor/editsubmajor.component';
import { TimeComponent } from '../Views/AdminViews/time/time.component';
import { RoomComponent } from '../Views/AdminViews/unit/room/room.component';
import { AddroomComponent } from '../Views/AdminViews/unit/room/addroom/addroom.component';
import { EditroomComponent } from '../Views/AdminViews/unit/room/editroom/editroom.component';
import { GroupslotComponent } from '../Views/AdminViews/time/groupslot/groupslot.component';
import { AddgroupComponent } from '../Views/AdminViews/time/groupslot/addgroup/addgroup.component';
import { EditgroupComponent } from '../Views/AdminViews/time/groupslot/editgroup/editgroup.component';
import { SlotComponent } from '../Views/AdminViews/time/groupslot/slot/slot.component';
import { AddslotComponent } from '../Views/AdminViews/time/groupslot/slot/addslot/addslot.component';
import { EditslotComponent } from '../Views/AdminViews/time/groupslot/slot/editslot/editslot.component';
import { SemesterComponent } from '../Views/AdminViews/academic/semester/semester.component';
import { AddsemesterComponent } from '../Views/AdminViews/academic/semester/addsemester/addsemester.component';
import { EditSemesterComponent } from '../Views/AdminViews/academic/semester/editsemester/editsemester.component';

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
        path: 'academic/semester/:id/edit',
        component: EditSemesterComponent,
      },
      {
        path: 'academic/semester/add',
        component: AddsemesterComponent,
      },
      {
        path: 'academic/semester',
        component: SemesterComponent,
      },
      {
        path: 'academic',
        component: AcademicComponent,
      },
      {
        path: 'timetable/groupslot/:id/slot/:id2/edit',
        component: EditslotComponent,
      },
      {
        path: 'timetable/groupslot/:id/slot/add',
        component: AddslotComponent,
      },
      {
        path: 'timetable/groupslot/:id/slot',
        component: SlotComponent,
      },
      {
        path: 'timetable/groupslot/:id/edit',
        component: EditgroupComponent,
      },
      {
        path: 'timetable/groupslot/add',
        component: AddgroupComponent,
      },
      {
        path: 'timetable/groupslot',
        component: GroupslotComponent,
      },
      {
        path: 'timetable',
        component: TimeComponent,
      },
      {
        path: 'unit',
        component: UnitComponent,
      },

      {
        path: 'unit/school/add',
        component: AddunitComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/class/:id2/edit',
        component: EditclassComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/class/add',
        component: AddclassComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/room/:id2/edit',
        component: EditroomComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/room/add',
        component: AddroomComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/room',
        component: RoomComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/class',
        component: ClassComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id/edit',
        component: EditunitComponent,
        pathMatch: 'full',
      },
      {
        path: 'unit/school/:id',
        component: UnitdetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'major/add',
        component: AddmajorComponent,
        pathMatch: 'full',
      },
      {
        path: 'major/:id/submajor/:id/edit',
        component: EditsubmajorComponent,
        pathMatch: 'full',
      },
      {
        path: 'major/:id/submajor/add',
        component: AddsubmajorComponent,
        pathMatch: 'full',
      },
      {
        path: 'major/:id/edit',
        component: EditmajorComponent,
        pathMatch: 'full',
      },
      {
        path: 'major/:id/submajor',
        component: SubmajorComponent,
        pathMatch: 'full',
      },
      {
        path: 'major/:id',
        component: MajordetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'major',
        component: MajorComponent,
        pathMatch: 'full',
      },
    ],
  },
];
