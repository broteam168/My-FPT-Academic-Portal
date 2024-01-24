import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [DrawerComponent,HeaderComponent,MatIcon],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent {
  menu: any;
  constructor() {
    this.menu = getMenu('Units');
    console.log(this.menu);
  }
  getCountSchools()
  {
    return 5;
  }
}
