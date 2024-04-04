import { Component } from '@angular/core';
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
import { MajorService, SubmajorService } from '../../../../../Services';
import { Major } from '../../../../../Models';

@Component({
  selector: 'app-add-submajor',
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
  templateUrl: './addsubmajor.component.html',
  styleUrl: './addsubmajor.component.scss',
})
export class AddsubmajorComponent {
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
  constructor(
    private subMajorService: SubmajorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private majorService: MajorService
  ) {
    this.menu = getMenu('Majors');
    this.router = router;
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      fullName: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
    this.majorService.getAllMajors().subscribe((x) => {
      this.majors = x.data;
    });
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  createSchool() {
     if (this.classForm.valid) {
      this.loading = true;
      var newClass = this.classForm.getRawValue();
      var temp = this.router.url.split('/');
      temp.pop();
      temp.pop();
      newClass['majorId'] = Number(temp.pop());
      newClass['isCommon'] = false;
      newClass['type'] = null;
      console.log(newClass);
      this.subMajorService.createNewSubMajor(newClass).subscribe((data) => {
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
  
    this.router.navigateByUrl(temp.join('/'));
  }
}
