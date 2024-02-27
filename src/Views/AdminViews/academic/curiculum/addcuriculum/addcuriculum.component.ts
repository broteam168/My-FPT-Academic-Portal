import { Component } from '@angular/core';
import { DrawerComponent } from '../../../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../../../Common/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { getMenu } from '../../../MenuDrawer';
import { Router } from '@angular/router';
import { CuriculumService } from '../../../../../Services/curiculum.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubMajor } from '../../../../../Models/Major/submajor';
import { SubmajorService } from '../../../../../Services';
import { Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';

@Component({
  selector: 'app-addcuriculum',
  standalone: true,
  templateUrl: './addcuriculum.component.html',
  styleUrl: './addcuriculum.component.scss',
  imports: [
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    CommonModule,
    LoadingmodalComponent,
    MessageboxComponent,
    ReactiveFormsModule
  ],
})
export class AddcuriculumComponent {
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;

  curiculumForm: FormGroup;
  subMajors: SubMajor[];
  subMajorService: SubmajorService;

  subjects: Subject[];
  subjectService: SubjectService;
  constructor(
    private router: Router,
    private curiculumService: CuriculumService,
    private formBuilder: FormBuilder,
    subMajorService: SubmajorService,
    subjectService: SubjectService
  ) {
    this.menu = getMenu('Academic');
    this.subMajorService = subMajorService;
    this.subMajorService.getAllSubMajor().subscribe((x) => {
      this.subMajors = x.data;
    });

    this.subjectService = subjectService;
    this.subjectService.getAllSubject().subscribe((x) => {
      this.subjects = x.data;
    });

    this.curiculumForm = this.formBuilder.group({
      subjectId: ['', Validators.required],
      subMajorId: ['', Validators.required],
      semester: ['', Validators.required]
    });
  }

  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }

  close() {
    this.openMessage = false;
    if (this.naviage == true) {
      this.goBack();
    }
  }

  createCuriculum() {
    if (this.curiculumForm.valid) {
        this.loading = true;
        var newCuriculum = this.curiculumForm.getRawValue();
        this.curiculumService.createCuriculum(newCuriculum).subscribe(data => {
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
    }
    else {
        this.messageTitle = 'Error occur';
        this.fail = true;
        this.messageDescription = 'Curiculum is exist or Information is empty';
        this.openMessage = true;
        
    }
    this.loading = false;
  }
}
