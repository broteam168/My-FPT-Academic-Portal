import { Component } from '@angular/core';
import { DrawerComponent } from "../../Common/drawer/drawer.component";
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { HeaderComponent } from "../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-timetable',
    standalone: true,
    templateUrl: './timetable.component.html',
    styleUrl: './timetable.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent,
        MatIcon,
        CommonModule
    ]
})
export class TimetableComponent {
    menu: any;
    constructor(
        private router: Router
    ) {
        this.menu = getMenu('Timetable')
    }
}
