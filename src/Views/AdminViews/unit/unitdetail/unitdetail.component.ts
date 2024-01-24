import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../../MenuDrawer';
import { SchoolService } from '../../../../Services';
import { School } from '../../../../Models';

@Component({
  selector: 'app-unitdetail',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon],
  templateUrl: './unitdetail.component.html',
  styleUrl: './unitdetail.component.scss'
})
export class UnitdetailComponent {
  menu: any;
  currentItem : School;
  schoolService: SchoolService;
  constructor(schoolService: SchoolService) {
    this.menu = getMenu('Units');
    this.schoolService = schoolService;
    this.schoolService.getAllSchools();
    
  }
}
