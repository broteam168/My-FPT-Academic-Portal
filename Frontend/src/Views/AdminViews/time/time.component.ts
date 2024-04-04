import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../Common';
import { MatIcon } from '@angular/material/icon';
import { getMenu } from '../MenuDrawer';
import { Router } from '@angular/router';
import { GroupSlot } from '../../../Models';
import { Session } from '../../../Models/Time/session';
import { CourseService } from '../../../Services/Academic/course.service';
import { SessionService } from '../../../Services/Time/session.service';
import { GroupslotService } from '../../../Services/Time/groupslot.service';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  menu: any;
  groupSlots: GroupSlot[];
  countGroupSlot: number = 0;

  constructor(
    private router:Router,
    private groupSlotService: GroupslotService,
    private sessionService: SessionService
    ) {
    this.menu = getMenu('Timetable');

    this.groupSlotService.getAllSets().subscribe(x => {
      this.groupSlots = x.data;
      this.countGroupSlot = this.groupSlots.length;
    });
  }
  manageSlot()
  {
    this.router.navigateByUrl(this.router.url+'/groupslot')
  }
  manageSession()
  {
    this.router.navigateByUrl(this.router.url+'/session')
  }
}
