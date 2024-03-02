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

import { SubjectComponent } from '../Views/AdminViews/academic/subject/subject.component';
import { TimeComponent } from '../Views/AdminViews/time/time.component';
import { RoomComponent } from '../Views/AdminViews/unit/room/room.component';

import { AddsubjectComponent } from '../Views/AdminViews/academic/subject/addsubject/addsubject.component';
import { DeletesubjectComponent } from '../Views/AdminViews/academic/subject/deletesubject/deletesubject.component';
import { CuriculumComponent } from '../Views/AdminViews/academic/curiculum/curiculum.component';
import { DetailSubjectComponent } from '../Views/AdminViews/academic/subject/detail-subject/detail-subject.component';
import { EditdetailsubjectComponent } from '../Views/AdminViews/academic/subject/editdetailsubject/editdetailsubject.component';
import { SyllabusComponent } from '../Views/AdminViews/academic/syllabus/syllabus.component';
import { DetailsyllabusComponent } from '../Views/AdminViews/academic/syllabus/detailsyllabus/detailsyllabus.component';
import { EditdetailsyllabusComponent } from '../Views/AdminViews/academic/syllabus/editdetailsyllabus/editdetailsyllabus.component';
import { AddsyllabusComponent } from '../Views/AdminViews/academic/syllabus/addsyllabus/addsyllabus.component';
import { AddcuriculumComponent } from '../Views/AdminViews/academic/curiculum/addcuriculum/addcuriculum.component';
import { EditcuriculumComponent } from '../Views/AdminViews/academic/curiculum/editcuriculum/editcuriculum.component';



import { AddroomComponent } from '../Views/AdminViews/unit/room/addroom/addroom.component';
import { EditroomComponent } from '../Views/AdminViews/unit/room/editroom/editroom.component';
import { SemesterComponent } from '../Views/AdminViews/academic/semester/semester.component';
import { AddsemesterComponent } from '../Views/AdminViews/academic/semester/addsemester/addsemester.component';
import { EditSemesterComponent } from '../Views/AdminViews/academic/semester/editsemester/editsemester.component';
import { CourseComponent } from '../Views/AdminViews/academic/course/course.component';
import { EditslotComponent } from '../Views/AdminViews/time/groupslot/slot/editslot/editslot.component';
import { AddslotComponent } from '../Views/AdminViews/time/groupslot/slot/addslot/addslot.component';
import { SlotComponent } from '../Views/AdminViews/time/groupslot/slot/slot.component';
import { EditgroupComponent } from '../Views/AdminViews/time/groupslot/editgroup/editgroup.component';
import { AddgroupComponent } from '../Views/AdminViews/time/groupslot/addgroup/addgroup.component';
import { GroupslotComponent } from '../Views/AdminViews/time/groupslot/groupslot.component';
import { studentGuard } from '../Helpers/student.guard';
import { TimetableComponent } from '../Views/StudentViews/timetable/timetable.component';
import { Curiculum1Component } from '../Views/StudentViews/curiculum1/curiculum1.component';
import { Course1Component } from '../Views/StudentViews/course1/course1.component';


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
        path: 'academic/course',
        component: CourseComponent,
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
        path: 'academic/subject',
        component: SubjectComponent,
      },
      {
        path: 'academic/subject/detail/:id',
        component: DetailSubjectComponent,
      },
      {
        path: 'academic/subject/add',
        component: AddsubjectComponent,
      },
      {
        path: 'academic/subject/delete',
        component: DeletesubjectComponent,
      },
      {
        path: 'academic/subject/curiculum',
        component: CuriculumComponent,
      },
      {
        path: 'academic/subject/detail/:id/edit',
        component: EditdetailsubjectComponent,
      },
      {
        path: 'academic/subject/detail/:id/syllabus',
        component: SyllabusComponent,
      },
      {
        path: 'academic/subject/detail/:id/syllabus/add',
        component: AddsyllabusComponent,
      },
      {
        path: 'academic/subject/detail/:id/syllabus/detail/:id2',
        component: DetailsyllabusComponent,
      },
      {
        path: 'academic/subject/detail/:id/syllabus/detail/:id2/edit',
        component: EditdetailsyllabusComponent,
      },
      {
        path: 'academic/subject/curiculum/add',
        component: AddcuriculumComponent,
      },
      {
        path: 'academic/subject/curiculum/edit/:id',
        component: EditcuriculumComponent,
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
  {
    path: 'student',
    canActivateChild: [studentGuard],
    children: [
      {
        path: 'timetable',
        component: TimetableComponent,
      },
      {
        path: 'curiculum1',
        component: Curiculum1Component,
      },
      {
        path: 'course1',
        component: Course1Component,
      },
    ]
  },
];
