import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NgFor,NgIf,MatIcon],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  items = [
    {
      icon:"computer",
      name:"Dashboard",
      url:"/",
      current:true,
      below:false
    },
    {
      icon:"home",
      name:"Account",
      url:"/",
      current:false,
      below:false
    },
    {
      icon:"home",
      name:"Academic",
      url:"/",
      current:false,
      below:false
    },
    {
      icon:"home",
      name:"Semester",
      url:"/",
      current:false,
      below:false
    },
    {
      icon:"home",
      name:"News",
      url:"/",
      current:false,
      below:true
    }
  ]
  filterBelowItems()
  {
    return this.items.filter(x=>x.below);
  }
}
