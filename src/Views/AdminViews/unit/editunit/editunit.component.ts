import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../Common/loadingmodal/loadingmodal.component';
import { getMenu } from '../../MenuDrawer';
import { SchoolService } from '../../../../Services';
import { Router } from '@angular/router';
import { School } from '../../../../Models';

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
  templateUrl: './editunit.component.html',
  styleUrl: './editunit.component.scss'
})
export class EditunitComponent implements OnInit{
  schoolForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading:boolean
  naviage:boolean;
  schoolService:SchoolService;
  currentSchool : School;
  constructor(
    schoolService: SchoolService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Units');
    this.router = router;
    this.schoolForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Phone: ['', Validators.required],
      Location: ['', Validators.required],
      Description: ['', Validators.required],
      IsActive: [true],
    });
    this.schoolService = schoolService;
   
   // console.log(temp.pop());
   
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.schoolService.getCurrentSchool(temp.pop()).subscribe(x=>
      {
        this.currentSchool = x.data;
        
        this.schoolForm.controls['Name'].setValue( this.currentSchool.name);
        this.schoolForm.controls['Phone'].setValue( this.currentSchool.phone);
        this.schoolForm.controls['Location'].setValue( this.currentSchool.location);
        this.schoolForm.controls['Description'].setValue( this.currentSchool.description);
        
        this.schoolForm.controls['IsActive'].setValue( this.currentSchool.isActive);
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
      this.schoolService.updateSchool(temp.pop(),newSchool).subscribe(data=>{
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
    this.router.navigateByUrl(temp.join('/'));
  }
}
