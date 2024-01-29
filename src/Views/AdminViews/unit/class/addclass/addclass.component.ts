import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassService } from '../../../../../Services/class.service';
import { getMenu } from '../../../MenuDrawer';
import { DrawerComponent, HeaderComponent } from '../../../../Common';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MessageboxComponent } from '../../../../Common/messagebox/messagebox.component';
import { LoadingmodalComponent } from '../../../../Common/loadingmodal/loadingmodal.component';

@Component({
  selector: 'app-addclass',
  standalone: true,
  imports: [NgIf,
    DrawerComponent,
    HeaderComponent,
    MatIcon,
    ReactiveFormsModule,
    MessageboxComponent,
    LoadingmodalComponent
  ],
  templateUrl: './addclass.component.html',
  styleUrl: './addclass.component.scss',
})
export class AddclassComponent {
  classForm: FormGroup;
  menu: any;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  naviage: boolean;

  constructor(
    private classService: ClassService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.menu = getMenu('Units');
    this.router = router;
    this.classForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Phone: ['', Validators.required],
      Location: ['', Validators.required],
      Description: ['', Validators.required],
      IsActive: [true],
    });
    
  }
  close() {
    this.openMessage = false;
    if (this.naviage == true) this.goBack();
  }
  createSchool() {
    if (this.classForm.valid) {
      this.loading = true;
      var newSchool = this.classForm.getRawValue();
      // this.classService.createNewSchool(newSchool).subscribe((data) => {
      //   if (data['responseCode'] == 200) {
      //     this.messageTitle = 'Notification';
      //     this.fail = false;
      //     this.messageDescription = data['message'];
      //     this.openMessage = true;
      //     this.naviage = true;
      //   } else {
      //     this.messageTitle = 'Error';
      //     this.fail = true;
      //     this.messageDescription = data['message'];
      //     this.openMessage = true;
      //   }
      //   return data;
      // });
    } else {
      this.messageTitle = 'Error Occurs';
      this.fail = true;
      this.messageDescription = 'Please enter full information to continue';
      this.openMessage = true;
    }
    this.loading = false;
  }
  goBack() {
    this.router.navigateByUrl('/admin/unit');
  }
}
