import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  @Input() items: any;

  
}
