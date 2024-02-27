import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../../../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../../../Common/header/header.component';
import { Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Syllabus } from '../../../../../Models/syllabus';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SyllabusService } from '../../../../../Services/syllabus.service';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { NgIf } from '@angular/common';
import { Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';

@Component({
  selector: 'app-editdetailsyllabus',
  standalone: true,
  templateUrl: './editdetailsyllabus.component.html',
  styleUrl: './editdetailsyllabus.component.scss',
  imports: [
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    NgIf,
    ReactiveFormsModule,
    LoadingmodalComponent,
    MessageboxComponent,
  ],
})
export class EditdetailsyllabusComponent implements OnInit {
  menu: any;
  syllabuses: Syllabus[];
  syllabusForm: FormGroup;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  syllabusService: SyllabusService;
  currentSyllabus: Syllabus;
  navigate: boolean;
  constructor(
    private router: Router,
    syllabusService: SyllabusService,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Academic');

    this.syllabusForm = this.formBuilder.group({
      studentTasks: ['', Validators.required],
      tools: ['', Validators.required],
      scoringScale: ['', Validators.required],
      markMin: ['', Validators.required],
      approvedDate: ['', Validators.required],
      slot: ['', Validators.required],
      isActive: [false],
      subjectId: ['']
    });
    this.syllabusService = syllabusService;
    var temp1 = this.router.url.split('/');
    temp1.pop();
    this.syllabusService.getSyllabusById(temp1.pop()).subscribe((response) => {
      this.currentSyllabus = response.data;
    });
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.syllabusService.getSyllabusById(temp.pop()).subscribe((x) => {
      this.currentSyllabus = x.data;
      this.syllabusForm.controls['studentTasks'].setValue(
        this.currentSyllabus.studentTasks
      );
      this.syllabusForm.controls['tools'].setValue(this.currentSyllabus.tools);
      this.syllabusForm.controls['scoringScale'].setValue(
        this.currentSyllabus.scoringScale
      );
      this.syllabusForm.controls['markMin'].setValue(
        this.currentSyllabus.markMin
      );
      this.syllabusForm.controls['approvedDate'].setValue(
        this.currentSyllabus.approvedDate
      );
      this.syllabusForm.controls['slot'].setValue(this.currentSyllabus.slot);
      this.syllabusForm.controls['isActive'].setValue(
        this.currentSyllabus.active
      );
      this.syllabusForm.controls['subjectId'].setValue(this.currentSyllabus.subjectId);
    });
  }

  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }

  close() {
    this.openMessage = false;
    if (this.navigate == true) {
      this.goBack();
    }
  }

  updateDetailSubject() {
    let currentApprovedDate = this.syllabusForm.controls['approvedDate'].value;
    let currentDate = new Date(currentApprovedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    let newApprovedDate = currentDate.toISOString().split('T')[0];
    this.syllabusForm.controls['approvedDate'].setValue(newApprovedDate);

    var newSyllabus = this.syllabusForm.getRawValue();
    var temp = this.router.url.split('/');
    temp.pop();
    this.syllabusService
      .updateSubject(temp.pop(), newSyllabus)
      .subscribe((data) => {
        if (data['responseCode'] == 200) {
          this.messageTitle = 'Notification';
          this.fail = false;
          this.messageDescription = data['message'];
          this.openMessage = true;
          this.navigate = true;
        } else {
          this.messageTitle = 'Error';
          this.fail = true;
          this.messageDescription = data['message'];
          this.openMessage = true;
        }
        return data;
      });
  }
}
