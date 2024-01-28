import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../../MenuDrawer';
import { SchoolService } from '../../../../Services';
import { Class, School } from '../../../../Models';
import { NgClass, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../Services/class.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-unitdetail',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgClass, NgFor],
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
  count :number;
  counti:number;
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
  onChange(event:any) {
    this.count =Number(event)
    this.DataClasses = [];
    console.log(Number(this.start + this.count - 1))
   this.start = 1;
    this.DataClasses = this.classes.filter(
      (x, i) => this.start - 1 <= i && i <Number( this.start + this.count - 1)
    );
  }
  BackListClass()
  {
   
      this.start = this.start-this.count;
      if(this.start<=0) this.start = 1;
      this.DataClasses = this.classes.filter(
        (x, i) => this.start - 1 <= i && i <Number( this.start + this.count - 1)
      );
    
  }
  nextListClass()
  {
    if(this.start+this.count-1<this.classes.length)
    {
      this.start = this.start+this.count;
      this.DataClasses = this.classes.filter(
        (x, i) => this.start - 1 <= i && i <Number( this.start + this.count - 1)
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
  editschool()
  {
    this.router.navigateByUrl(this.router.url+'/edit');
  }
  goBack() {
    this.router.navigateByUrl('/admin/unit');
  }
}
