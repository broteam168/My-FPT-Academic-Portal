import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubMajor } from '../../../../../Models/submajor';
import { MajorService, SubmajorService } from '../../../../../Services';
import { Major, Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';
import { CuriculumService } from '../../../../../Services/curiculum.service';
import { Curiculum } from '../../../../../Models/curiculum';
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";

@Component({
    selector: 'app-editcuriculum',
    standalone: true,
    templateUrl: './editcuriculum.component.html',
    styleUrl: './editcuriculum.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        MatIcon,
        CommonModule,
        LoadingmodalComponent,
        MessageboxComponent,
        ReactiveFormsModule
    ]
})
export class EditcuriculumComponent implements OnInit{
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  navigate: boolean;

  curiculumForm: FormGroup;
  subMajors: SubMajor[];
  submajorService: SubmajorService;

  subjects: Subject[];
  subjectService: SubjectService;

  

  currentCuriculum: Curiculum;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private curiculumService: CuriculumService,
    subMajorService: SubmajorService,
    subjectService: SubjectService
  ) {
    this.menu = getMenu('Academic');
    this.submajorService = subMajorService;

    

    this.submajorService.getAllSubMajor().subscribe((x) => {
      this.subMajors = x.data;
    });

    this.subjectService = subjectService;
    this.subjectService.getAllSubject().subscribe((x) => {
      this.subjects = x.data;
    });

    this.curiculumForm = this.formBuilder.group({
      subjectId: ['', Validators.required],
      subMajorId: ['', Validators.required],
      semester: ['', Validators.required],
      createAt: ['']
    });

    
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    
    this.curiculumService.getCuriculumById(temp.pop()).subscribe(x => {
      this.currentCuriculum = x.data;
      this.curiculumForm.controls['subjectId'].setValue(this.currentCuriculum.subject.id);
      this.curiculumForm.controls['subMajorId'].setValue(this.currentCuriculum.subMajorId);
      this.curiculumForm.controls['semester'].setValue(this.currentCuriculum.semester);
      this.curiculumForm.controls['createAt'].setValue(this.currentCuriculum.createAt);
    });

    
  }

  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }

  close() {
    this.openMessage = false;
    if (this.navigate == true) {
      this.goBack();
    }
  }

  updateCuriculum() {
    var newCuriculum = this.curiculumForm.getRawValue();
    var temp = this.router.url.split('/');
    this.curiculumService.updateCuriculum(temp.pop(), newCuriculum).subscribe(data => {
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
