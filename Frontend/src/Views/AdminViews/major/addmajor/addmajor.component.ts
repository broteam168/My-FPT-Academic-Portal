import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MajorService, SchoolService } from '../../../../Services';
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
  templateUrl: './addmajor.component.html',
  styleUrl: './addmajor.component.scss',
})
export class AddmajorComponent {
  majorForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading:boolean
  naviage:boolean;
  
  constructor(
    private majorService: MajorService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Majors');
    this.router = router;
    this.majorForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      degreeLevel: ['', Validators.required],
      fullName: ['', Validators.required],
      description:['',Validators.required],
      isActive: [true],
    });
    
  }
  close() {
    this.openMessage = false;
    if(this.naviage == true) this.goBack();
  }
  createMajor() {
     
    if (this.majorForm.valid) {
      this.loading = true;
      var newMajor =this.majorForm.getRawValue();
      this.majorService.createNewMajor(newMajor).subscribe(data=>{
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
    this.router.navigateByUrl('/admin/major');
  }
}
