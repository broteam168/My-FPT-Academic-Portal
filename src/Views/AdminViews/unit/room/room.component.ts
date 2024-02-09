import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { SchoolService } from '../../../../Services';
import { Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Class, School } from '../../../../Models';
import { ClassService } from '../../../../Services/class.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgFor, NgClass, NgIf,MessageboxComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent {
  menu: any;
  DataClasses: Class[];

  currentItem: School;
  schoolService: SchoolService;
  classes: Class[];
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

  constructor(
    schoolService: SchoolService,
    private router: Router,
    private classService: ClassService
  ) {
    this.menu = getMenu('Units');
    var temp = router.url.split('/');
    temp.pop();
    this.classService.getClassesById(temp.pop() || '1').subscribe((data) => {
      this.classes = data.data;
      this.start = 1;
      this.count = 5;
      this.DataClasses = this.classes.filter(
        (x, i) => this.start - 1 <= i && i < this.start + this.count - 1
      );
    });
  }
  onChange(event: any) {
    this.count = Number(event);
    this.DataClasses = [];
    console.log(Number(this.start + this.count - 1));
    this.start = 1;
    this.DataClasses = this.classes.filter(
      (x, i) => this.start - 1 <= i && i < Number(this.start + this.count - 1)
    );
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
  countClasses() {
    return this.classes.length;
  }
  countDeactivedClasses() {
    return this.classes.filter((x) => x.isActive == false).length;
  }
  countActivedClasses() {
    return this.classes.filter((x) => x.isActive == true).length;
  }
  getPercentage() {
    return Math.round((this.countActivedClasses() / this.classes.length) * 100);
  }
  goBack() {
    this.router.navigateByUrl('/admin/unit');
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
  addClass() {
    this.router.navigateByUrl(this.router.url + '/add');
  }
  editClass(id: number) {
    this.router.navigateByUrl(this.router.url + '/' + id + '/edit');
  }
  currentId:any;
  deletee(id:any) {
    this.currentId = id;
    this.openMessage = true;
  }
  close() {
    this.openMessage = false;
  }
  deletea() {
   
    this.classService.deleteClass(this.currentId).subscribe((data) => {
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
  close2() {
    this.openMessage2 = false;
    var temp = this.router.url.split('/');
    temp.pop();
   
     if(this.naviage==true)  this.classService.getClassesById(temp.pop() || '1').subscribe((data) => {
      this.classes = data.data;
      this.start = 1;
      this.count = 5;
      console.log(this.classes);
      this.DataClasses = this.classes.filter(
        (x, i) => this.start - 1 <= i && i < this.start + this.count - 1
      );
    });
  }
}
