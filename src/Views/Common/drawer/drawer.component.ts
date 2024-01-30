import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NgFor, NgIf, MatIcon],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @Input() items: any;
  filterBelowItems() {
    return this.items.filter((x: { below: any }) => x.below == true);
  }
  filterNonBelowItems() {
    return this.items.filter((x: { below: any }) => x.below == false);
  }
}
