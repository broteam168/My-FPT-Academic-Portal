import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppConfigService } from '../Services/app-config.service';
import { AuthService } from '../Services/auth.service';
import { UserAuth } from '../Models';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  currentUser: UserAuth;
  constructor(private appConfigService: AppConfigService,
    private authenticationService: AuthService)
  {
  }
  ngOnInit(): void {
    this.appConfigService.loadAppConfig();
   
  }
  title = 'FPT Academic Portal';

}
