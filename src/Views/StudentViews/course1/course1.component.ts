import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../Common/drawer/drawer.component";
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { HeaderComponent } from "../../Common/header/header.component";
import { CommonModule } from '@angular/common';
import { Class, Subject, UserAuth } from '../../../Models';
import { SubjectService } from '../../../Services/Academic/subject.service';
import { CourseService } from '../../../Services/Academic/course.service';
import { Course } from '../../../Models/Academic/course';
import { MatIcon } from '@angular/material/icon';
import { LoadingmodalComponent } from "../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../Common/messagebox/messagebox.component";
import { Student } from '../../../Models/Academic/student';

@Component({
    selector: 'app-course1',
    standalone: true,
    templateUrl: './course1.component.html',
    styleUrl: './course1.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        CommonModule,
        MatIcon,
        LoadingmodalComponent,
        MessageboxComponent
    ]
})
export class Course1Component implements OnInit{
  menu: any;
  courses: Course[];

  openMessage: boolean;
  messageTitle: string;
  messageDescription: string;
  fail: boolean;
  navigate: boolean;
  openMessage2: boolean;
  loading: boolean;
  
  currentUser: UserAuth | null;
  currentStudent: Student;
  constructor(
    private router: Router,
    private courseService: CourseService
  ) {
    this.menu = getMenu('Course');
  }
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(x => {
      this.courses = x.data;

      this.courses.filter(course => course.status === 'ASSIGNED');
    });

    
  }

  getCountCourse() {
    return this.courses.length;
  }

  currentCourse: Course;
  openDetail(input: Course) {
    this.currentCourse = input;
    this.openMessage = true;
  }

  close() {
    this.openMessage = false;
  }


}
