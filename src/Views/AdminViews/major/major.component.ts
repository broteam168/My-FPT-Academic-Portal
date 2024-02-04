import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor } from '@angular/common';
import { MajorService, SchoolService } from '../../../Services';
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { Major } from '../../../Models';

@Component({
  selector: 'app-major',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent, MatIcon, NgFor, NgClass],
  templateUrl: './major.component.html',
  styleUrl: './major.component.scss',
})
export class MajorComponent {
  menu: any;
  majors:Major[];
  constructor(private majorService: MajorService, private router: Router) {
    this.menu = getMenu('Majors');

    this.router = router;

  }
  ngOnInit(): void {
    this.majorService.getAllMajors().subscribe((x) => {
      this.majors = x.data;
    });
  }
  addMajor() {
    this.router.navigate([this.router.url + '/add']);
  }
  viewDetailMajor(id: string) {
    // this.schoolService.setCurrentSchool(id);

    this.router.navigate([this.router.url + '/' + id]);
  }
  refreshMajor() {
    this.majorService.getAllMajors().subscribe((x) => {
      this.majors = x.data;
    });
  }
  getAllMajor() {
    return this.majors;
  }
  getCountMmajor() {
    return this.majors ? this.majors.length : 0;
  }
  manageSbmajor(id: any) {
    this.router.navigate([this.router.url + '/'+id+'/submajor']);
  }
}
