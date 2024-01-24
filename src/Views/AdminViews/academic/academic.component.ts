import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { getMenu } from '../MenuDrawer';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon],
  templateUrl: './academic.component.html',
  styleUrl: './academic.component.scss',
})
export class AcademicComponent {
  menu: any;
  constructor() {
    this.menu = getMenu('Academic');
    console.log(this.menu);
  }
}
