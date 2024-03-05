import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';
import { getMenu } from '../MenuDrawer';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-information1',
  standalone: true,
  templateUrl: './information1.component.html',
  styleUrl: './information1.component.scss',
  imports: [DrawerComponent, HeaderComponent, MatIcon],
})
export class Information1Component implements OnInit {
  menu: any;
  currentUser: 
  constructor(private router: Router) {
    this.menu = getMenu('Information');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showPass() {
    const passwordField = document.querySelector(
      '#password'
    ) as HTMLInputElement;
    const showPassword = document.querySelector(
      '#show-password'
    ) as HTMLInputElement;

    passwordField.type = showPassword.checked ? 'text' : 'password';
  }
}
