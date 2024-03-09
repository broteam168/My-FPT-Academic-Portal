import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';
import { Router } from '@angular/router';
import { UserAuth } from '../../../Models';
import { Student } from '../../../Models/Academic/student';
import { StudentService } from '../../../Services/Academic/student.service';
import { AuthService } from '../../../Services';
import { CuriculumService } from '../../../Services/Academic/curiculum.service';
import { Curiculum } from '../../../Models/curiculum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curiculum1',
  standalone: true,
  templateUrl: './curiculum1.component.html',
  styleUrl: './curiculum1.component.scss',
  imports: [
    DrawerComponent, 
    HeaderComponent, 
    MatIcon,
    CommonModule
  ],
})
export class Curiculum1Component implements OnInit{
  menu: any;
  currentUser: UserAuth | null;
  currentStudent: Student;

  curiculums: Curiculum[];
  constructor(
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService,
    private curiculumService: CuriculumService
  ) {
    this.menu = getMenu('Curriculum');
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    this.studentService.getStudentByUserId(this.currentUser?.UserId).subscribe(x => {
      this.currentStudent = x.data;

      this.curiculumService.getCuriculumBySubMajorId(this.currentStudent.subMajorId).subscribe(y => {
        this.curiculums = y.data;
        this.sortCurriculumBySemester();
      })
    });
  }

  sortCurriculumBySemester() {
    this.curiculums.sort((a, b) => a.semester - b.semester);
  }
}
