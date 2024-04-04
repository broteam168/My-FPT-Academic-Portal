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
import { Class, Major } from '../../../../../Models';

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
  templateUrl: './editclass.component.html',
  styleUrl: './editclass.component.scss',
})
export class EditclassComponent implements OnInit {
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
  currentClass: Class;
  constructor(
    private classService: ClassService,
    private router: Router,
    private formBuilder: FormBuilder,
    private majorService: MajorService
  ) {
    this.menu = getMenu('Units');
    this.router = router;
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      majorId: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [true],
    });
    this.majorService.getAllMajors().subscribe((x) => {
      this.majors = x.data;
    });
  }
  ngOnInit(): void {
    var temp = this.router.url.split('/');
    temp.pop();
    this.classService.getCurrentClass(temp.pop()).subscribe((x) => {
      this.currentClass = x.data;
      console.log(this.currentClass);
      this.classForm.controls['name'].setValue(this.currentClass.name);
      this.classForm.controls['majorId'].setValue(this.currentClass.major.id);
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

      var id = temp.pop();
      temp.pop();

      newClass['school'] = Number(temp.pop());
      console.log(newClass);
      this.classService.updateClasS(Number(id),newClass).subscribe((data) => {
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
