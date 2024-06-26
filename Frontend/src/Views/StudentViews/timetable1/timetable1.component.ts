import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';
import { TimetableComponent } from '../../Common/timetable/timetable.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourseService } from '../../../Services/Academic/course.service';
import { StudentService } from '../../../Services/Academic/student.service';
import { AuthService } from '../../../Services';
import { SessionService } from '../../../Services/Time/session.service';
import { UserAuth } from '../../../Models';
import { Student } from '../../../Models/Academic/student';
import { Session } from '../../../Models/Time/session';
import { Course } from '../../../Models/Academic/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timetable1',
  standalone: true,
  templateUrl: './timetable1.component.html',
  styleUrl: './timetable1.component.scss',
  imports: [
    DrawerComponent,
    HeaderComponent,
    TimetableComponent,
    CommonModule,
    MatIcon,
    FormsModule,
  ],
})
export class Timetable1Component implements OnInit {
  menu: any;

  currentUser: UserAuth | null;
  currentStudent: Student;

  sessions: Session[] = [];
  courses: Course[];
  slots: number[] = [];
  days: string[] = [];
  constructor(
    private router: Router,
    private courseService: CourseService,
    private studentService: StudentService,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
    this.menu = getMenu('Timetable');
  }
  ngOnInit(): void {

    this.initWeek();

    this.initSlot();

    this.initDay();

    this.currentUser = this.authService.currentUserValue;

    this.studentService
      .getStudentByUserId(this.currentUser?.UserId)
      .subscribe((x) => {
        this.currentStudent = x.data;

        this.studentService
          .getCourseByStudentId(this.currentStudent.id)
          .subscribe((y) => {
            this.courses = y.data;

            this.courses.forEach((z) => {
              this.sessionService.getAllByCourseId(z.id).subscribe((t) => {
                this.sessions.push(...t.data);
              });
            });
            console.log(this.sessions);
          });
    });

    
  }

  weeks: { value: string; text: string }[] = [];

  initWeek() {
    let index = 0;
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-29');
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const endOfWeek = new Date(currentDate);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      const text =
        this.formatDate(currentDate) + ' To ' + this.formatDate(endOfWeek);
      this.weeks.push({ value: this.formatDate(currentDate), text: text });

      currentDate.setDate(currentDate.getDate() + 7);
    }

    console.log(this.weeks);
  }

  formatDate(date: any): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    // return '${day}/${month}';
    return day + '/' + month;
  }

  initSlot() {
    this.slots.push(1);
    this.slots.push(2);
    this.slots.push(3);
    this.slots.push(4);
    this.slots.push(5);
    this.slots.push(6);
  }

  initDay() {
    this.days.push(this.currentDay1);
    this.days.push(this.currentDay2);
    this.days.push(this.currentDay3);
    this.days.push(this.currentDay4);
    this.days.push(this.currentDay5);
    this.days.push(this.currentDay6);
    this.days.push(this.currentDay7);

  }

  currentDay1: string;
  currentDay2: string;
  currentDay3: string;
  currentDay4: string;
  currentDay5: string;
  currentDay6: string;
  currentDay7: string;

  showData(date: string) {
    
    const currentYear = new Date().getFullYear();
    this.currentDay1 = date + '/' + currentYear;
    this.currentDay2 = this.increaseDate1(this.currentDay1);
    this.currentDay3 = this.increaseDate1(this.currentDay2);
    this.currentDay4 = this.increaseDate1(this.currentDay3);
    this.currentDay5 = this.increaseDate1(this.currentDay4);
    this.currentDay6 = this.increaseDate1(this.currentDay5);
    this.currentDay7 = this.increaseDate1(this.currentDay6);
    this.days = [];

    this.days.push(this.currentDay1);
    this.days.push(this.currentDay2);
    this.days.push(this.currentDay3);
    this.days.push(this.currentDay4);
    this.days.push(this.currentDay5);
    this.days.push(this.currentDay6);
    this.days.push(this.currentDay7);
  }

  increaseDate1(dateStr: string): string {
    let temp = dateStr;
    let temp1 = temp.split('/');
    let day = temp1[0];
    let month = temp1[1];
    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    let formattedDateString = `${month}/${day}/${currentYear}`; 

    const dateObject = new Date(formattedDateString);
    dateObject.setDate(dateObject.getDate() + 1);

    return this.formatDate2(dateObject);
  }

  formatDate2(date: any): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    // return '${day}/${month}';
    return day + '/' + month + '/' + year;
  }

  formatDate3(date: any): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    // return '${day}/${month}';
    return month + '/' + day + '/' + year;
  }
   parseDateString(dateString: string): Date | null {
    const parts = dateString.split('/');
    if (parts.length !== 3) {
        return null; // Invalid date format
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in Date objects
    const year = parseInt(parts[2], 10);

    // Create a new Date object
    const date = new Date(year, month, day);

    // Validate the Date object (optional)
    if (isNaN(date.getTime())) {
        return null; // Invalid date
    }

    return date;
}
  isSessionInSlotAndDay(session: Session, slot: number, day: string) {
    const sessionSlot = session.slot;
  
  
    return session.dateDay.toString() ==  day && sessionSlot == slot; 
  }

  detailSyllabus(id: any) {
    console.log(this.router.url + '/subject/' + id + '/syllabus')
    this.router.navigateByUrl(this.router.url + '/subject/' + id + '/syllabus');
  }
}
