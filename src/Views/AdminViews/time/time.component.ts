import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  menu: any;
  constructor(private router:Router) {
    this.menu = getMenu('Timetable');
  }
  manageSlot()
  {
    this.router.navigateByUrl(this.router.url+'/groupslot')
  }
}
