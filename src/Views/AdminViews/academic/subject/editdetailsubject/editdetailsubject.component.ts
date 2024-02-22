import { Component, OnInit } from '@angular/core';
import { getMenu } from '../../../MenuDrawer';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../../../../../Services/subject.service';
import { Subject } from '../../../../../Models';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";

@Component({
    selector: 'app-editdetailsubject',
    standalone: true,
    templateUrl: './editdetailsubject.component.html',
    styleUrl: './editdetailsubject.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        MatIcon,
        NgClass,
        NgIf,
        NgFor,
        ReactiveFormsModule,
        LoadingmodalComponent,
        MessageboxComponent
    ]
})
export class EditdetailsubjectComponent implements OnInit {
  menu: any;
  subjects: Subject[];
  subjectFrom: FormGroup;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  subjectService: SubjectService;
  currentSubject: Subject;
  navigate: boolean;
  constructor(
    subjectService: SubjectService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Academic');
    this.subjectFrom = this.formBuilder.group({
      subjectCode: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      credits: ['', Validators.required],
      prerequisite: [''],
      description: ['', Validators.required],
      status: [true],
    });
    this.subjectService = subjectService;
    this.subjectService.getAllSubject().subscribe((x) => {
      this.subjects = x.data;
    });
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.subjectService.getSubjectById(temp.pop()).subscribe(x => {
      this.currentSubject = x.data;
      this.subjectFrom.controls['subjectCode'].setValue(this.currentSubject.subjectCode);
      this.subjectFrom.controls['name'].setValue(this.currentSubject.name);
      this.subjectFrom.controls['type'].setValue(this.currentSubject.type);
      this.subjectFrom.controls['credits'].setValue(this.currentSubject.credits);
      this.subjectFrom.controls['prerequisite'].setValue(this.currentSubject.prerequisite);
      this.subjectFrom.controls['description'].setValue(this.currentSubject.description);
      this.subjectFrom.controls['status'].setValue(this.currentSubject.status);
    });

    this.subjects = this.subjects.filter((x) => x.id != this.currentSubject.id);
  }

  close() {
    this.openMessage = false;
    if (this.navigate == true) {
      this.goBack();
    }
  }

  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }

  updateDetailSubject() {
    var newSubject = this.subjectFrom.getRawValue();
    console.log(newSubject);
      var temp = this.router.url.split('/');
      temp.pop();
      this.subjectService
        .updateSubject(temp.pop(), newSubject)
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
