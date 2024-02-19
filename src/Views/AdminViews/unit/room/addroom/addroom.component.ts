import { Component } from '@angular/core';

import { Route, Router } from '@angular/router';

import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { getMenu } from '../../../MenuDrawer';
import { RoomService } from '../../../../../Services/Unit/room.service';
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
  templateUrl: './addroom.component.html',
  styleUrl: './addroom.component.scss',
})
export class AddroomComponent {
  roomForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading:boolean
  naviage:boolean;
  
  constructor(
    private roomService : RoomService,
    router: Router,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Majors');
    this.router = router;
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      building: ['', Validators.required],
      description:['',Validators.required],
      isActive: [true],
    });
    
  }
  close() {
    this.openMessage = false;
    if(this.naviage == true) this.goBack();
  }
  createMajor() {
     
    if (this.roomForm.valid) {
      this.loading = true;
      var newRoom =this.roomForm.getRawValue();
      var temp = this.router.url.split('/');
      temp.pop();
      temp.pop();
      newRoom['schoolId'] = temp.pop();
      this.roomService.createNewRoom(newRoom).subscribe(data=>{
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
    var returnUrl = this.router.url.split('/');
    returnUrl.pop();
    this.router.navigateByUrl(returnUrl.join('/'));
  }
}
