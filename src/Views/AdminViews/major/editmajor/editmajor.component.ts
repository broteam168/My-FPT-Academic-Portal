import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../Common/loadingmodal/loadingmodal.component';
import { Router } from '@angular/router';
import { MajorService } from '../../../../Services';
import { getMenu } from '../../MenuDrawer';
import { Major } from '../../../../Models';

@Component({
  selector: 'app-editmajor',
  standalone: true,
  imports: [NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent
  ],
  templateUrl: './editmajor.component.html',
  styleUrl: './editmajor.component.scss'
})
export class EditmajorComponent {
  majorForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading:boolean
  naviage:boolean;
  currentItem: Major;

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
    var tempUrl = this.router.url.split('/');
    tempUrl.pop();
    this.majorService.getSpecificMajor(tempUrl.pop()).subscribe(x=>
      {
        this.currentItem = x.data;
        this.majorForm.controls['name'].setValue(this.currentItem.name);
        this.majorForm.controls['category'].setValue(this.currentItem.category);
        this.majorForm.controls['degreeLevel'].setValue(this.currentItem.degreeLevel);
        this.majorForm.controls['fullName'].setValue(this.currentItem.fullName);
        this.majorForm.controls['description'].setValue(this.currentItem.description);
        this.majorForm.controls['isActive'].setValue(this.currentItem.isActive);
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
      var temp = this.router.url.split('/') ; 
      temp.pop();
      this.majorService.updateMajor(temp.pop(),newMajor).subscribe(data=>{
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
    var tempUrl = this.router.url.split('/');
    tempUrl.pop();
    this.router.navigateByUrl(tempUrl.join('/'));
  }
}
