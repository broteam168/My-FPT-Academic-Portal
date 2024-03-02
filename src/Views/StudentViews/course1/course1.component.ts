import { Component } from '@angular/core';
import { DrawerComponent } from "../../Common/drawer/drawer.component";
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { HeaderComponent } from "../../Common/header/header.component";

@Component({
    selector: 'app-course1',
    standalone: true,
    templateUrl: './course1.component.html',
    styleUrl: './course1.component.scss',
    imports: [DrawerComponent, HeaderComponent]
})
export class Course1Component {
  menu: any;
  constructor(
    private router: Router,
  ) {
    this.menu = getMenu('')
  }
}
