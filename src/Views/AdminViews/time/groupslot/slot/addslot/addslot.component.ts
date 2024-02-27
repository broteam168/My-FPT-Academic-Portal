import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DrawerComponent, HeaderComponent } from '../../../../../Common';
import { MessageboxComponent } from '../../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../../Common/loadingmodal/loadingmodal.component';
import { SlotService } from '../../../../../../Services/slot.service';
import { getMenu } from '../../../../MenuDrawer';


@Component({
  selector: 'app-addclass',
  standalone: true,
  imports: [
    NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    NgFor,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent,
  ],
  templateUrl: './addslot.component.html',
  styleUrl: './addslot.component.scss',
})
export class AddslotComponent {
  classForm: FormGroup;
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;
  
  constructor(
    private slotService: SlotService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.menu = getMenu('Timetable');
    this.router = router;
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      order: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
  
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  createSchool() {
    console.log(this.classForm.getRawValue());
    if (this.classForm.valid) {
      this.loading = true;
      var newClass = this.classForm.getRawValue();
      var temp = this.router.url.split('/');
      temp.pop();
      temp.pop();
      newClass['groupId'] = Number(temp.pop());
      console.log(newClass);
      this.slotService.createSlot(newClass).subscribe((data) => {
        if (data['responseCode'] == 200) {
          this.messageTitle = 'Notification';
          this.fail = false;
          this.messageDescription = data['message'];
          this.openMessage = true;
          this.naviage = true;
        } else {
          this.messageTitle = 'Error';
          this.fail = true;
          this.messageDescription = data['message'];
          this.openMessage = true;
        }
        return data;
      });
    } else {
      this.messageTitle = 'Error Occurs';
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
