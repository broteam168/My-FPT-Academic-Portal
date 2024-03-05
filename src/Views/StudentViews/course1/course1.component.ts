import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../Common/drawer/drawer.component";
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { HeaderComponent } from "../../Common/header/header.component";
import { CommonModule } from '@angular/common';
import { Class, Subject } from '../../../Models';
import { SubjectService } from '../../../Services/Academic/subject.service';
import { CourseService } from '../../../Services/Academic/course.service';
import { Course } from '../../../Models/Academic/course';

@Component({
    selector: 'app-course1',
    standalone: true,
    templateUrl: './course1.component.html',
    styleUrl: './course1.component.scss',
    imports: [
      DrawerComponent, 
      HeaderComponent,
      CommonModule
    ]
})
export class Course1Component implements OnInit{
  menu: any;
  courses: Course[];

  constructor(
    private router: Router,
    private courseService: CourseService
  ) {
    this.menu = getMenu('');
  }
  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(x => {
      this.courses = x.data;

      this.courses.filter(course => course.status == 'ASSIGNED');
    });

    
  }

  getCountCourse() {
    return this.courses.length;
  }
}
