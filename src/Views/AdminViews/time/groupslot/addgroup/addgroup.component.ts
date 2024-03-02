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
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { getMenu } from '../../../MenuDrawer';
import { GroupslotService } from '../../../../../Services/Time/groupslot.service';

@Component({
  selector: 'app-addunit',
  standalone: true,
  imports: [
    NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent,
  ],
  templateUrl: './addgroup.component.html',
  styleUrl: './addgroup.component.scss',
})
export class AddgroupComponent {
  schoolForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;

  constructor(router: Router, private formBuilder: FormBuilder, private groupSlotService:GroupslotService) {
    this.menu = getMenu('TimeTable');
    this.router = router;
    this.schoolForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  createSchool() {
    if (this.schoolForm.valid) {
      this.loading = true;
      var newSchool = this.schoolForm.getRawValue();
       this.groupSlotService.createNewGroup(newSchool).subscribe((data) => {
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
    this.router.navigateByUrl('/admin/timetable/groupslot');
  }
}
