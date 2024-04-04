import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { SchoolService } from '../../../../Services';
import { getMenu } from '../../MenuDrawer';
import { GroupslotService } from '../../../../Services/Time/groupslot.service';
import { GroupSlot } from '../../../../Models';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgFor, NgClass,MessageboxComponent,NgIf],
  templateUrl: './groupslot.component.html',
  styleUrl: './groupslot.component.scss',
})
export class GroupslotComponent implements OnInit {
  menu: any;

  router: Router;
  sets : GroupSlot[];
  fail:boolean;
  messageDescription:string;
  messageTitle:string;
  openMessage2:boolean;
  openMessage:boolean;
  naviage:boolean;
  id:any;
  constructor(private groupslotservice:GroupslotService, router: Router) {
    this.menu = getMenu('Timetable');
    this.router = router;
  }
  ngOnInit(): void {
    this.groupslotservice.getAllSets().subscribe(data=>
      {
        this.sets = data.data;
      });
  }
  addSchool() {
    this.router.navigate([this.router.url + '/add']);
  }
  viewDetailSchool(id: string) {
   // this.schoolService.setCurrentSchool(id);

    this.router.navigate([this.router.url + '/school/' + id]);
  }
  refreshSchool() {
    
    this.groupslotservice.getAllSets().subscribe(data=>
      {
        this.sets = data.data;
      });
  }
  getAllSchool() {
    return this.sets;
  }
  getCountSchools() {
   return this.sets.length;
  }
  manageClass(id: string)
  {
    this.router.navigate([this.router.url + '/' + id+'/edit']);
  }
  manageRoom(id: string)
  {
    this.router.navigate([this.router.url + '/' + id+'/slot']);
  }
  deleteSchool(id:any)
  {
    this.id = id;
    console.log(id)
    this.openMessage = true;
    
  }
  deletea()
  {
    this.close();
    var temp = this.router.url;
     this.groupslotservice.deleteGroup(this.id).subscribe(data=>{
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
    this.refreshSchool();
  }
}
