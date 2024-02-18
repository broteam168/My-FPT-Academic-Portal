import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClassService } from '../../../../../Services/class.service';
import { getMenu } from '../../../MenuDrawer';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MajorService } from '../../../../../Services';
import { Class, Major, Room } from '../../../../../Models';
import { RoomService } from '../../../../../Services/room.service';

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
  templateUrl: './editroom.component.html',
  styleUrl: './editroom.component.scss',
})
export class EditroomComponent implements OnInit {
  roomForm: FormGroup;
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;
  major: Major;
  currentClass: Room;
  constructor(
    private roomService: RoomService,
    private router: Router,
    private formBuilder: FormBuilder,
    
  ) {
    this.menu = getMenu('Units');
    this.router = router;
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      building: ['', Validators.required],
      description:['',Validators.required],
      isActive: [true],
    });
    
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.roomService.getCurrentRoom(temp.pop()).subscribe((x) => {
      this.currentClass = x.data;
      console.log(this.currentClass);
      this.roomForm.controls['name'].setValue(this.currentClass.name);
      this.roomForm.controls['type'].setValue(this.currentClass.type);
      this.roomForm.controls['building'].setValue(this.currentClass.building);
      this.roomForm.controls['description'].setValue(
        this.currentClass.description
      );

      this.roomForm.controls['isActive'].setValue(this.currentClass.isActive);
    });
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  editRoom() {
    console.log(this.roomForm.getRawValue());
    if (this.roomForm.valid) {
      this.loading = true;
      var newClass = this.roomForm.getRawValue();
      var temp = this.router.url.split('/');
      temp.pop();

      var id = temp.pop();
      temp.pop();

      newClass['schoolId'] = Number(temp.pop());
      console.log(newClass);
       this.roomService.updateRoom(Number(id),newClass).subscribe((data) => {
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
