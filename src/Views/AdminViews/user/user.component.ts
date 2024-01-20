import { Component } from '@angular/core';
import { DrawerComponent } from '../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../Common/header/header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DrawerComponent,HeaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
