import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../../MenuDrawer';
import { SchoolService } from '../../../../Services';
import { Class, School } from '../../../../Models';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../Services/Unit/class.service';
import { NgModel } from '@angular/forms';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';

@Component({
  selector: 'app-unitdetail',
  standalone: true,
  imports: [
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    NgClass,
    NgFor,
    MessageboxComponent,
    NgIf,
  ],
  templateUrl: './unitdetail.component.html',
  styleUrl: './unitdetail.component.scss',
})
export class UnitdetailComponent {
  menu: any;
  DataClasses: Class[];

  currentItem: School;
  schoolService: SchoolService;
  router: Router;
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
  naviage:boolean;
  constructor(
    schoolService: SchoolService,
    private classService: ClassService,
    router: Router,
    private activeroute: ActivatedRoute
  ) {
    this.menu = getMenu('Units');
    this.schoolService = schoolService;
    this.schoolService.getAllSchools();
    this.router = router;
    this.schoolService
      .getCurrentSchool(router.url.split('/').pop())
      .subscribe((response) => {
        this.currentItem = response.data;
        this.classService
          .getClassesById(this.currentItem.id)
          .subscribe((data) => {
            this.classes = data.data;
            this.start = 1;
            this.count = 5;
            this.DataClasses = this.classes.filter(
              (x, i) => this.start - 1 <= i && i < this.start + this.count - 1
            );
          });
      });
  }
  search(text:string)
  {
    this.DataClasses =   this.DataClasses = this.classes.filter(
      (x, i) => this.start - 1 <= i && i < Number(this.start + this.count - 1)
    ).filter(x=>x.name.toLowerCase().includes(text.toLowerCase()))
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
  editschool() {
    this.router.navigateByUrl(this.router.url + '/edit');
  }
  goBack() {
    this.router.navigateByUrl('/admin/unit');
    
  }
  deleteSchool()
  {
    
    this.openMessage = true;
  }
  deletea()
  {
    this.close();
    var temp = this.router.url;
     this.schoolService.deleteSchool(temp.split('/').pop()).subscribe(data=>{
        if(data['responseCode'] == 200)
        {
          this.messageTitle = 'Notification' ;
          this.fail = false;
          this.messageDescription = data['message'];
          this.openMessage2 = true;
          this.naviage=true;
        }
        else
        {
          this.messageTitle = 'Error' ;
          this.fail = true;
          this.messageDescription = data['message'];
          this.openMessage2 = true;
        }
        return data;
      })
  }
  close() {
    
    this.openMessage = false;
  }
  close2() {
    this.openMessage2 = false;
    if(this.naviage==true) this.goBack();
  }
  
}
