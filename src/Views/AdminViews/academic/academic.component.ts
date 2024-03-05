import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { getMenu } from '../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { Subject } from '../../../Models';
import { SubjectService } from '../../../Services/Academic/subject.service';

@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon],
  templateUrl: './academic.component.html',
  styleUrl: './academic.component.scss',
})
export class AcademicComponent {
  menu: any;
  subjectService: SubjectService;
  subjects: Subject[];
  countSubject: number = 0;

  constructor(
    private router : Router,
    subjectService: SubjectService,

    ) {
    this.menu = getMenu('Academic');

    this.subjectService = subjectService;
    this.subjectService.getAllSubject().subscribe(x => {
      this.subjects = x.data;
      this.countSubject = this.subjects.length;
    });
  }
  ManageSemester()
  {
    this.router.navigateByUrl(this.router.url + '/semester')
  }
  ManageCourse()
  {
    this.router.navigateByUrl(this.router.url + '/course')
  }

  goToSubject() {
    this.router.navigate([this.router.url + '/subject']);
  }
}
