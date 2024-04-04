import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';
import { getMenu } from '../MenuDrawer';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Class, Major, School, UserAuth } from '../../../Models';
import { AuthService, ClassService, SchoolService, SubmajorService } from '../../../Services';
import { Student } from '../../../Models/Academic/student';
import { StudentService } from '../../../Services/Academic/student.service';

@Component({
  selector: 'app-information1',
  standalone: true,
  templateUrl: './information1.component.html',
  styleUrl: './information1.component.scss',
  imports: [DrawerComponent, HeaderComponent, MatIcon],
})
export class Information1Component implements OnInit{
  menu: any;
  currentUser: UserAuth | null;
  currentStudent: Student;

  currentSchool: School;
  currentClass: Class;
  currentSubMajor: Major;
  constructor(private router: Router,
    private schoolService: SchoolService,
    private classService: ClassService,
    private studentService: StudentService,
    private authService: AuthService,
    private subMajorService: SubmajorService
    ) {
    this.menu = getMenu('Information');

    
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    

    this.studentService.getStudentByUserId(this.currentUser?.UserId).subscribe(x => {
      this.currentStudent = x.data;
      console.log(this.currentStudent);

      this.schoolService.getCurrentSchool(this.currentStudent.schoolId).subscribe(y => {
        this.currentSchool = y.data;
      });

      this.classService.getCurrentClass(this.currentStudent.classId).subscribe(z => {
        this.currentClass = z.data;
      });

      this.subMajorService.getSpecificSubMajor(this.currentStudent.subMajorId).subscribe(t => {
        this.currentSubMajor = t.data;
      });
    });
  }



  // showPass() {
  //   const passwordField = document.querySelector(
  //     '#password'
  //   ) as HTMLInputElement;
  //   const showPassword = document.querySelector(
  //     '#show-password'
  //   ) as HTMLInputElement;

  //   passwordField.type = showPassword.checked ? 'text' : 'password';
  // }
}
