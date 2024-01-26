import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../../MenuDrawer';
import { SchoolService } from '../../../../Services';
import { School } from '../../../../Models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-unitdetail',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon,NgClass],
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
