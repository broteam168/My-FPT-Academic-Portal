import { Component } from '@angular/core';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';
import { NgFor } from '@angular/common';
import { getMenu } from '../MenuDrawer';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DrawerComponent,HeaderComponent,NgFor],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  menu : any ; 
  DataUser = [
    {
      UserName:"admin",
      UserFullName:"Nguyen Hoang Son",
      roles:"admin",
      phone:"0922963838",
      LastLogin:"01-01-2024",
      Status:"Active"
    },
    {
      UserName:"admin",
      UserFullName:"Nguyen Hoang Son",
      roles:"admin",
      phone:"0922963838",
      LastLogin:"01-01-2024",
      Status:"Active"
    }
  ]

  constructor()
  {
    this.menu = getMenu('Account');
    console.log(this.menu);
  }
}
