import { Component } from '@angular/core';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curiculum1',
  standalone: true,
  templateUrl: './curiculum1.component.html',
  styleUrl: './curiculum1.component.scss',
  imports: [DrawerComponent, HeaderComponent, MatIcon],
})
export class Curiculum1Component {
  menu: any;
  constructor(
    private router: Router,
  ) {
    this.menu = getMenu('Curriculum');
  }
}
