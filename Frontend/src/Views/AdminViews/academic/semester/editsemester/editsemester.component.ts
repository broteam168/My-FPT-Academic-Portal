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
import { DatePipe, NgClass, NgFor, NgIf, formatDate } from '@angular/common';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MajorService } from '../../../../../Services';
import { Class, Major } from '../../../../../Models';
import { SemesterService } from '../../../../../Services/Academic/semester.service';
import { Semester } from '../../../../../Models/Academic/semester';

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
  templateUrl: './editsemester.component.html',
  styleUrl: './editsemester.component.scss',
})
export class EditSemesterComponent implements OnInit {
  classForm: FormGroup;
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;
  currentClass: Semester;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private semesterService: SemesterService
  ) {
    this.menu = getMenu('Academic');
    this.router = router;
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      order: ['', Validators.required],
      year: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
    
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.semesterService.getCurrentSemester(temp.pop()).subscribe((x) => {
      this.currentClass = x.data;
      
      this.classForm.controls['name'].setValue(this.currentClass.name);
      this.classForm.controls['year'].setValue(this.currentClass.year);
        this.classForm.controls['order'].setValue(this.currentClass.order);
        this.classForm.controls['startDate'].setValue(this.currentClass.startDate);
        this.classForm.controls['endDate'].setValue(this.currentClass.endDate,"yyyy-dd-MM");
     
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
    
      this.semesterService.updateSemester(Number(temp.pop()),newClass).subscribe((data) => {
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
