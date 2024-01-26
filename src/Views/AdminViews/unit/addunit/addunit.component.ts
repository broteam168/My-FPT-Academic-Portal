import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { SchoolService } from '../../../../Services';
import { Route, Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl,ReactiveFormsModule, FormBuilder, Validators  } from '@angular/forms';
import { MessageboxComponent } from '../../../Common/messagebox/messagebox.component';
@Component({
  selector: 'app-addunit',
  standalone: true,
  imports: [DrawerComponent,HeaderComponent,MatIcon,ReactiveFormsModule,MessageboxComponent],
  templateUrl: './addunit.component.html',
  styleUrl: './addunit.component.scss'
})
export class AddunitComponent {
  schoolForm : FormGroup;
  menu: any;
  router : Router;
  constructor(schoolService: SchoolService , router : Router, private formBuilder: FormBuilder,) {
    this.menu = getMenu('Units');
    this.router = router;
    this.schoolForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Phone: ['',Validators.required ],
      Location: ['',Validators.required],
      Description: ['', Validators.required],
      IsActive: [true,]
    });
  }
 
  createSchool()
  {
    
  }
  goBack()
  {
    this.router.navigateByUrl('/admin/unit');
  }
}
