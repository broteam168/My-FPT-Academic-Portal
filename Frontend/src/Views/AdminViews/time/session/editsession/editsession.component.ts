import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClassService } from '../../../../../Services/Unit/class.service';
import { getMenu } from '../../../MenuDrawer';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MajorService } from '../../../../../Services';
import { Class, Major, Room } from '../../../../../Models';
import { RoomService } from '../../../../../Services/Unit/room.service';
import { CourseService } from '../../../../../Services/Academic/course.service';
import { Course } from '../../../../../Models/Academic/course';

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
  templateUrl: './editsession.component.html',
  styleUrl: './editsession.component.scss',
})
export class EditsessionComponent implements OnInit {
  classForm: FormGroup;
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;
  majors: Major[];
  major: Major;
  currentCourse: Course;
  allRoom: Room[];
  constructor(
    private classService: ClassService,
    private courseService:CourseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private majorService: MajorService,
    private roomService:RoomService
  ) {
    this.menu = getMenu('Academic');
    this.router = router;
    this.classForm = this.formBuilder.group({
      name: ['', ],
      subMajor: ['',],
      semester: ['', ],
      roomId: ['', Validators.required],
      slots: ['', Validators.required],
      days: ['', Validators.required],
      isActive: [true],
    });
   
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    var id = temp.pop();
    this.courseService.getCurrentCourse(id).subscribe((x) => {
      this.currentCourse = x.data;console.log(this.currentCourse);

      this.roomService.getRoomsById(this.currentCourse.classs.school.toString()).subscribe(response=>{
       this.allRoom = response.data;
      });
       this.classForm.controls['name'].setValue(this.currentCourse.name);
       console.log(this.currentCourse.subMajor)
       this.classForm.controls['subMajor'].setValue(this.currentCourse.subMajor.fullName);
       this.classForm.controls['semester'].setValue(this.currentCourse.semester.name);
       this.classForm.controls['roomId'].setValue(this.currentCourse.room.id);
       this.classForm.controls['slots'].setValue(this.currentCourse.slots);
       this.classForm.controls['days'].setValue(this.currentCourse.days);
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
      newClass['subMajorId'] = this.currentCourse.subMajor.id;
      newClass['semesterId'] = this.currentCourse.semester.id;
      newClass['classId'] = this.currentCourse.classs.id;
      newClass['subjectId'] = this.currentCourse.subject.id;
      this.courseService.updateCourse(Number(id),newClass, this.classForm.controls['isActive'].value).subscribe((data) => {
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
