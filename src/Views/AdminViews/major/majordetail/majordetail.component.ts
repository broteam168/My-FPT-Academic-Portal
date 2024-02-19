import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../../MenuDrawer';
import { MajorService, SchoolService, SubmajorService } from '../../../../Services';
import { Class, Major, School } from '../../../../Models';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../Services/Unit/class.service';
import { NgModel } from '@angular/forms';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';
import { SubMajor } from '../../../../Models/Major/submajor';

@Component({
  selector: 'app-majordetail',
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
  templateUrl: './majordetail.component.html',
  styleUrl: './majordetail.component.scss',
})
export class MajordetailComponent implements OnInit {
  menu: any;
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
  naviage:boolean;
  constructor(
    private majorService: MajorService,
    subMajorService:SubmajorService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) {

  
  
    majorService.getSpecificMajor(router.url.split('/').pop())
      .subscribe((response) => {
        this.currentItem = response.data;
        subMajorService.getSubMajorInMajor(this.currentItem.id)
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
  ngOnInit(): void {
    this.menu = getMenu('Majors');
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
  countSubMajors()
  {
    return this.DataClasses.length;
  }
 countDeactived()
 {
  return this.DataClasses.filter(x=>x.isActive == false).length;
 }
 countActived()
 {
  return this.DataClasses.filter(x=>x.isActive == true).length;
 }
 countPercentActive()
 {
    return Math.round(this.countActived() / this.countSubMajors()*100) ;
 }
  goBack() {
    this.router.navigateByUrl('/admin/major');
    
  }
  deleteSchool()
  {
    this.openMessage = true;
  }
  deletea()
  {
    this.close();
    var temp = this.router.url;
     this.majorService.deleteMajor(temp.split('/').pop()).subscribe(data=>{
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
  editMajor()
  {
    this.router.navigateByUrl(this.router.url+'/edit');
  }
}
