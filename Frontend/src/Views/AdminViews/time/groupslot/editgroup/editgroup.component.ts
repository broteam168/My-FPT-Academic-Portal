import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { Router } from '@angular/router';
import { SchoolService } from '../../../../../Services';
import { GroupSlot, School } from '../../../../../Models';
import { getMenu } from '../../../MenuDrawer';
import { GroupslotService } from '../../../../../Services/Time/groupslot.service';


@Component({
  selector: 'app-editunit',
  standalone: true,
  imports: [NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent,
    
  ],
  templateUrl: './editgroup.component.html',
  styleUrl: './editgroup.component.scss'
})
export class EditgroupComponent implements OnInit{
  schoolForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading:boolean
  naviage:boolean;
  currentSchool : GroupSlot;
  constructor(
    private groupSlotService: GroupslotService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Timetable');
    this.router = router;
    this.schoolForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
   
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.groupSlotService.getCurrentGroup(temp.pop()).subscribe(x=>
      {
        this.currentSchool = x.data;
        
        this.schoolForm.controls['name'].setValue( this.currentSchool.name);
        this.schoolForm.controls['type'].setValue( this.currentSchool.type);
        this.schoolForm.controls['description'].setValue( this.currentSchool.description);
        this.schoolForm.controls['isActive'].setValue( this.currentSchool.isActive);
      })
  }
  close() {
    this.openMessage = false;
    if(this.naviage == true)  this.goBack();
  }
  updateSchool() {
    if (this.schoolForm.valid) {
      this.loading = true;
      var newSchool =this.schoolForm.getRawValue();
      var temp = this.router.url.split('/');
      temp.pop();
      this.groupSlotService.updateGroup(temp.pop(),newSchool).subscribe(data=>{
        if(data['responseCode'] == 200)
        {
          this.messageTitle = 'Notification' ;
          this.fail = false;
          this.messageDescription = data['message'];
          this.openMessage = true;
          this.naviage = true;
        }
        else
        {
          this.messageTitle = 'Error' ;
          this.fail = true;
          this.messageDescription = data['message'];
          this.openMessage = true;
        }
        return data;
      })
    } else {
      this.messageTitle = 'Error Occurs' ;
      this.fail = true;
      this.messageDescription = 'Please enter full information to continue';
      this.openMessage = true;
     
    }
    this.loading = false;
  }
  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }
}
