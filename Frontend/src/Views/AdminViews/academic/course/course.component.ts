import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';
import { ClassService, SchoolService } from '../../../../Services';
import { Class, Major, Room, School } from '../../../../Models';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SubMajor } from '../../../../Models/Major/submajor';
import { Course } from '../../../../Models/Academic/course';
import { CourseService } from '../../../../Services/Academic/course.service';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgFor, NgClass,MessageboxComponent,NgIf],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  menu: any;
  allSchools: School[];
  allClasses: Class[];
  currentSchool: string;
  currentClass: string;

  DataClasses: SubMajor[];

  currentItem: Major;
  classes: SubMajor[];
  start: number;
  count: number;
  counti: number;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  openMessage2: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;

  allCourse: Course[];
  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private classService: ClassService,
    private courseService: CourseService
  ) {
    this.menu = getMenu('Academic');
  }
  ngOnInit(): void {
    this.schoolService.getAllBaseSchools().subscribe((response) => {
      this.allSchools = response.data;
    });
    
  }
  selectSchool(id: any) {
    if (Number(Number(id)) != this.allSchools.length)
      this.classService
        .getClassesById(this.allSchools[Number(id)].id)
        .subscribe((response) => {
          this.allClasses = response.data;
        });
  }
  ShowData(idSchool: any, idClass: any) {
    var param;
    if (
      idSchool == this.allSchools.length &&
      idClass == (this.allClasses?this.allClasses.length : 0)
    ) {
      param = null;
    } else {
      param = '?';
      if (idClass != this.allClasses.length)
        param +=
          'schoolid=' +
          this.allSchools[idSchool].id +
          '&classid=' +
          this.allClasses[idClass].id;
      else param += 'schoolid=' + this.allSchools[idSchool].id;
    }
    this.courseService.getCourses(param).subscribe(x=>
      {
        this.allCourse = x.data;
      });
  }
  addClass() {
    this.router.navigateByUrl(this.router.url + '/add');
  }
  editClass(id: number) {
    this.router.navigateByUrl(this.router.url + '/' + id + '/edit');
  }
  BackListClass() {
    this.start = this.start - this.count;
    if (this.start <= 0) this.start = 1;
    this.DataClasses = this.classes.filter(
      (x, i) => this.start - 1 <= i && i < Number(this.start + this.count - 1)
    );
  }
  nextListClass() {
    if (this.start + this.count - 1 < this.classes.length) {
      this.start = this.start + this.count;
      this.DataClasses = this.classes.filter(
        (x, i) => this.start - 1 <= i && i < Number(this.start + this.count - 1)
      );
    }
  }

  goBack() {
    this.router.navigateByUrl('/admin/academic');
  }
  search(text: string) {
    this.DataClasses = this.DataClasses = this.classes
      .filter(
        (x, i) => this.start - 1 <= i && i < Number(this.start + this.count - 1)
      )
      .filter((x) => x.name.toLowerCase().includes(text.toLowerCase()));
  }
  exportData() {
    alert('This function is developing...');
  }

  currentId: any;
  deletee(id: any) {
    console.log("â")
    this.currentId = id;
    this.openMessage = true;
  }
  close() {
    this.openMessage = false;
  }
  loadData() {}
  deletea() {
    this.courseService.deleteCourse(this.currentId).subscribe((data) => {
      if (data['responseCode'] == 200) {
        this.messageTitle = 'Notification';
        this.fail = false;
        this.messageDescription = data['message'];
        this.openMessage2 = true;
        this.naviage = true;
      } else {
        this.messageTitle = 'Error';
        this.fail = true;
        this.messageDescription = data['message'];
        this.openMessage2 = true;
      }
      return data;
    });
    this.close();
  }
  getRoomName(room:Room)
  {
    if(room == null)
      return 'NONE'
    else return room.name
  }
  getTime(slot:any,days:any)
  {
    if(slot == null) slot = "NONE"
    if(days == null) days = "NONE"
    return slot+' IN '+days;
  }
  close2() {
    this.openMessage2 = false;
    var temp = this.router.url.split('/');
    temp.pop();
    
     
  }
}
