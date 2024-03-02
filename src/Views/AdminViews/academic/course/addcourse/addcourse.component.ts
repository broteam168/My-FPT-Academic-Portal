import { Component, OnInit } from '@angular/core';

import { Route, Router } from '@angular/router';

import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { getMenu } from '../../../MenuDrawer';
import { GroupslotService } from '../../../../../Services/Time/groupslot.service';
import { ClassService } from '../../../../../Services';
import { Class } from '../../../../../Models';
import { CourseService } from '../../../../../Services/Academic/course.service';

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
    NgFor
  ],
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.scss',
})
export class AddcourseComponent implements OnInit{
  schoolForm: FormGroup;
  menu: any;
  router: Router;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;

  allClasses : Class[]
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private classService : ClassService
  ) {
    this.menu = getMenu('Academic');
    this.router = router;

    
    this.schoolForm = this.formBuilder.group({
      classId: ['', Validators.required],
      semester: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    ///Add class option
    this.classService.getAlllClasses().subscribe(response=>
      {
        this.allClasses =  response.data;
        this.allClasses = this.allClasses.filter(x=>x.isActive == true);
      })
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  createSchool() {
    if (this.schoolForm.valid) {
      this.loading = true;
      var newSchool = this.schoolForm.getRawValue();
     
      this.courseService.createCourseByClass(newSchool).subscribe((data) => {
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
    this.router.navigateByUrl('/admin/academic/course');
  }
}
