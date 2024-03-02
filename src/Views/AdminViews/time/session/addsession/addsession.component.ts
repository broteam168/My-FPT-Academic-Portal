import { Component, OnInit } from '@angular/core';

import { Route, Router } from '@angular/router';

import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { getMenu } from '../../../MenuDrawer';
import { GroupslotService } from '../../../../../Services/Time/groupslot.service';
import { ClassService } from '../../../../../Services';
import { Class } from '../../../../../Models';
import { CourseService } from '../../../../../Services/Academic/course.service';
import { Course } from '../../../../../Models/Academic/course';
import { SessionService } from '../../../../../Services/Time/session.service';

@Component({
  selector: 'app-addunit',
  standalone: true,
  imports: [
    NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent,
    NgFor
  ],
  templateUrl: './addsession.component.html',
  styleUrl: './addsession.component.scss',
})
export class AddsessionComponent implements OnInit{
  schoolForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;
    currentCourse:Course;
  allCourses : Course[]
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private courseService : CourseService,
    private sessionService :SessionService
  ) {
    this.menu = getMenu('Timetable');
    this.router = router;

    
    this.schoolForm = this.formBuilder.group({
      courseId: ['', Validators.required]

    });
  }
  ngOnInit(): void {
    ///Add class option
    this.courseService.getAllCourses().subscribe(response=>
      {
        this.allCourses =  response.data;
        this.allCourses = this.allCourses.filter(x=>x.status == 'ASSIGN');
      })
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  createSchool() {
    if (this.schoolForm.valid) {
      this.loading = true;
      var newSchool = this.schoolForm.getRawValue();
      console
      this.sessionService.createSession(newSchool).subscribe((data) => {
        if (data['responseCode'] == 200) {
          this.messageTitle = 'Notification';
          this.fail = false;
          this.messageDescription = data['message'];
          this.openMessage = true;
          this.naviage = true;
        } else {
          this.messageTitle = 'Error';
          this.fail = true;
          this.messageDescription = data['message'];
          this.openMessage = true;
        }
        return data;
      });
    } else {
      this.messageTitle = 'Error Occurs';
      this.fail = true;
      this.messageDescription = 'Please enter full information to continue';
      this.openMessage = true;
    }
    this.loading = false;
    
  }
  selectSchool(id:number)
  {
    this.currentCourse = this.allCourses[id];
  }
  goBack() {
    this.router.navigateByUrl('/admin/academic/course');
  }
}
