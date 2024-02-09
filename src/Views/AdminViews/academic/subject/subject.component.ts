import { Component, OnInit } from "@angular/core";
import { getMenu } from "../../MenuDrawer";
import { DrawerComponent, HeaderComponent } from "../../../Common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent implements OnInit{
  menu: any;
  
  constructor() {
    this.menu = getMenu('Academic');
    console.log(this.menu);
  }
}