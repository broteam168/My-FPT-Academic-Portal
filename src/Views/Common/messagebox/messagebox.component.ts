import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './messagebox.component.html',
  styleUrl: './messagebox.component.scss',
})
export class MessageboxComponent implements OnChanges {
  @Input() open: boolean;
  @Input() title: string;
  @Input() description: string;
  @Input() type: boolean;
  @Output() closeModal = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    console.log("value changed", this.open);
  }
}
