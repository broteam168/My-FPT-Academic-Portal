import { Component } from '@angular/core';
import { DrawerComponent } from '../../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../../Common/header/header.component';
import { Course } from '../../../../Models/Academic/course';
import { UserAuth } from '../../../../Models';
import { Student } from '../../../../Models/Academic/student';
import { Router } from '@angular/router';
import { CourseService } from '../../../../Services/Academic/course.service';
import { getMenu } from '../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services';
import { StudentService } from '../../../../Services/Academic/student.service';
import { EnrollmentService } from '../../../../Services/Academic/enrollment.service';
import { LoadingmodalComponent } from "../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../Common/messagebox/messagebox.component";

@Component({
    selector: 'app-registercourse',
    standalone: true,
    templateUrl: './registercourse.component.html',
    styleUrl: './registercourse.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        MatIcon,
        CommonModule,
        LoadingmodalComponent,
        MessageboxComponent
    ]
})
export class RegistercourseComponent {
  menu: any;
  courses: Course[];

  openMessage: boolean;
  messageTitle: string;
  messageDescription: string;
  fail: boolean;
  navigate: boolean;
  openMessage2: boolean;
  loading: boolean;

  openMessage3: boolean;

  currentUser: UserAuth | null;
  currentStudent: Student;

  enrollmentForm: FormGroup;
  constructor(
    private router: Router, 
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService
    ) {
    this.menu = getMenu('Course');
    this.enrollmentForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      status: [true]
    })
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    this.studentService.getStudentByUserId(this.currentUser?.UserId).subscribe(x => {
      this.currentStudent = x.data;
    });

    this.courseService.getAllCourses().subscribe((x) => {
      this.courses = x.data;
      
    });
  }

  getCountCourse() {
    this.courses = this.courses.filter((x) => x.status === 'ASSIGNED');
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

  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }

  enrollCourse(id: any) {
    this.enrollmentForm.controls['studentId'].setValue(this.currentStudent.id);
    this.enrollmentForm.controls['courseId'].setValue(id);

    if (this.enrollmentForm.valid) {
      this.loading = true;
      var newEnrollment = this.enrollmentForm.getRawValue();
      this.enrollmentService.createEnrollment(newEnrollment).subscribe(data => {
        if (data['responseCode'] == 200) {
          this.messageTitle = 'Notification';
          this.fail = false;
          this.messageDescription = data['message'];
          this.openMessage3 = true;
          this.navigate = true;
        } else {
          this.messageTitle = 'Error';
          this.fail = true;
          this.messageDescription = data['message'];
          this.openMessage3 = true;
        }
        return data;
      });
    } else {
      this.messageTitle = 'Error Occur';
      this.fail = true;
      this.messageDescription = 'You are wrong somewhere';
      this.openMessage = true;
    }
    this.loading = false;
  }

  closeRegister() {
    this.openMessage3 = false;
    if (this.navigate == true) {
      this.goBack();
    }
  }
}
