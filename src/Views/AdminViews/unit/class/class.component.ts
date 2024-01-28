import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { SchoolService } from '../../../../Services';
import { Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [DrawerComponent,HeaderComponent],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent {
  menu: any;
  constructor(schoolService: SchoolService, router: Router) {
    this.menu = getMenu('Units');
  }
}
