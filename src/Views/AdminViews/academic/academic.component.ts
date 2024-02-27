import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { getMenu } from '../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon],
  templateUrl: './academic.component.html',
  styleUrl: './academic.component.scss',
})
export class AcademicComponent {
  menu: any;
  constructor(private router: Router) {
    this.menu = getMenu('Academic');
    console.log(this.menu);
  }
  goToSubject() {
    this.router.navigate([this.router.url + '/subject']);
  }
}
