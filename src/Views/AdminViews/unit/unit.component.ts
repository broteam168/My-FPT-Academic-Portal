import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';
import { School } from '../../../Models';
import { SchoolService } from '../../../Services';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgFor, NgClass],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent {
  menu: any;

  schoolService: SchoolService;
  constructor(schoolService: SchoolService) {
    this.menu = getMenu('Units');
    this.schoolService = schoolService;
    this.schoolService.getAllSchools();
    
  }
  viewDetailSchool(id:string)
  {
    console.log(id);
  }
  refreshSchool() {
    this.schoolService.getAllSchools();
  }
  getAllSchool() {
    return this.schoolService.schools;
  }
  getCountSchools() {
    return this.schoolService.schools ? this.schoolService.schools.length : 0;
  }
}
