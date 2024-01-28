import { Component, OnInit } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';
import { School } from '../../../Models';
import { SchoolService } from '../../../Services';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgFor, NgClass],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent implements OnInit {
  menu: any;

  schoolService: SchoolService;
  router: Router;
  constructor(schoolService: SchoolService, router: Router) {
    this.menu = getMenu('Units');
    this.schoolService = schoolService;
    this.schoolService.getAllSchools();
    this.router = router;
  }
  ngOnInit(): void {
    this.schoolService.getAllSchools();
  }
  addSchool() {
    this.router.navigate([this.router.url + '/school/add']);
  }
  viewDetailSchool(id: string) {
   // this.schoolService.setCurrentSchool(id);

    this.router.navigate([this.router.url + '/school/' + id]);
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
  manageClass(id: string)
  {
    this.router.navigate([this.router.url + '/school/' + id+'/class']);
  }
}
