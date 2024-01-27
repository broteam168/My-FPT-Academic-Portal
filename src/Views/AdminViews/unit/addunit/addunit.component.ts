import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { SchoolService } from '../../../../Services';
import { Route, Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../Common/loadingmodal/loadingmodal.component';
import { NgIf } from '@angular/common';
import { School } from '../../../../Models';
@Component({
  selector: 'app-addunit',
  standalone: true,
  imports: [NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent
  ],
  templateUrl: './addunit.component.html',
  styleUrl: './addunit.component.scss',
})
export class AddunitComponent {
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
  }
  close() {
    this.openMessage = false;
    if(this.naviage == true) this.goBack();
  }
  createSchool() {
    if (this.schoolForm.valid) {
      this.loading = true;
      var newSchool =this.schoolForm.getRawValue();
      this.schoolService.createNewSchool(newSchool).subscribe(data=>{
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
    this.router.navigateByUrl('/admin/unit');
  }
}
