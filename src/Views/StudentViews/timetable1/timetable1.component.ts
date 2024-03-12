import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getMenu } from '../MenuDrawer';
import { DrawerComponent } from "../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../Common/header/header.component";
import { TimetableComponent } from "../../Common/timetable/timetable.component";
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-timetable1',
    standalone: true,
    templateUrl: './timetable1.component.html',
    styleUrl: './timetable1.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent, 
        TimetableComponent,
        CommonModule,
        MatIcon
    ]
})
export class Timetable1Component implements OnInit{
  menu: any;
  constructor(
      private router: Router
  ) {
      this.menu = getMenu('Timetable')
  }
    ngOnInit(): void {
        this.initWeek();
    }


    weeks: {value: number, text: string}[] = [];
    initWeek() {
        const startDate = new Date("2024-01-01");
        const endDate = new Date("2024-12-29");
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const endOfWeek = new Date(currentDate);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            const text = this.formatDate(currentDate) + " To " + this.formatDate(endOfWeek); 
            this.weeks.push({value: currentDate.getDate(), text: text});
            currentDate.setDate(currentDate.getDate() + 7);
        }
    }

    formatDate(date: Date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        // return '${day}/${month}';
        return day + "/" + month;
    }
}
