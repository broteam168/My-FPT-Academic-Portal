import { Component } from '@angular/core';
import { DrawerComponent } from '../../../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../../../Common/header/header.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SyllabusService } from '../../../../../Services/syllabus.service';
import { getMenu } from '../../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { NgIf } from '@angular/common';
import { Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';

@Component({
  selector: 'app-addsyllabus',
  standalone: true,
  templateUrl: './addsyllabus.component.html',
  styleUrl: './addsyllabus.component.scss',
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
export class AddsyllabusComponent {
  menu: any;
  syllabusForm: FormGroup;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  navigate: boolean;
  currentSubject: Subject;

  constructor(
    private router: Router,
    private syllabusService: SyllabusService,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService
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
      subjectId: [''],
    });

    var temp = this.router.url.split('/');
    temp.pop();
    temp.pop();
    this.subjectService.getSubjectById(temp.pop()).subscribe((x) => {
      this.currentSubject = x.data;
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

  createSubject() {
    if (this.syllabusForm.valid) {
      this.loading = true;
      let currentApprovedDate = this.syllabusForm.controls['approvedDate'].value;
      let currentDate = new Date(currentApprovedDate);
      currentDate.setDate(currentDate.getDate() + 1);
      let newApprovedDate = currentDate.toISOString().split('T')[0];
      this.syllabusForm.controls['approvedDate'].setValue(newApprovedDate);

      this.syllabusForm.controls['subjectId'].setValue(this.currentSubject.id);

      var newSyllabus = this.syllabusForm.getRawValue();
      this.syllabusService.createNewSyllabus(newSyllabus).subscribe((data) => {
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
    } else {
      this.messageTitle = 'Error Occur';
      this.fail = true;
      this.messageDescription = 'Please enter full information to continue';
      this.openMessage = true;
    }
    this.loading = false;
  }
}
