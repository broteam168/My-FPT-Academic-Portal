import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../Services';
import { UserAuth } from '../../../Models';
import { NgIf } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  currentUser : UserAuth | null;
  drawer:boolean;
  
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  constructor(private authService : AuthService,private renderer: Renderer2,private router:Router)
  {
    this.drawer = false;
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
     
     if(e.target !== this.toggleButton.nativeElement && !(this.toggleButton.nativeElement  as HTMLElement).contains(e.target as HTMLElement)){
         this.drawer=false;
     }
 });
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser)
  }
  changeState()
  {
    this.drawer = !this.drawer;
  }
  logout()
  {
    this.router.navigateByUrl("login");
  }
}
