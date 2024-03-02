import { Component, OnInit } from '@angular/core';
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
import { Slot } from '../../../../../../Models/Time/slot';
import { SlotService } from '../../../../../../Services/Time/slot.service';
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
  templateUrl: './editslot.component.html',
  styleUrl: './editslot.component.scss',
})
export class EditslotComponent implements OnInit {
  classForm: FormGroup;
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;

  currentClass: Slot;
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
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.slotService.getSpecificSlot(temp.pop()).subscribe((x) => {
      this.currentClass = x.data;
      console.log(this.currentClass);
      this.classForm.controls['name'].setValue(this.currentClass.name);
      this.classForm.controls['order'].setValue(this.currentClass.order);
      this.classForm.controls['startTime'].setValue(this.currentClass.startTime.substring(0,5));
      this.classForm.controls['endTime'].setValue(this.currentClass.endTime.substring(0,5));
      
      this.classForm.controls['description'].setValue(
        this.currentClass.description
      );

      this.classForm.controls['isActive'].setValue(this.currentClass.isActive);
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

      var id = temp.pop();
      temp.pop();

      newClass['groupId'] = Number(temp.pop());
      console.log(newClass);
      this.slotService.updateSlot(Number(id),newClass).subscribe((data) => {
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
    temp.pop();

    this.router.navigateByUrl(temp.join('/'));
  }
}
