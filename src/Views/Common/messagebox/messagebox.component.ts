import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [NgIf],
  templateUrl: './messagebox.component.html',
  styleUrl: './messagebox.component.scss'
})
export class MessageboxComponent {
  
  @Input() open:boolean;
  @Input() title:string;
  @Input() description:string;
  closeModal()
  {
    this.open = false;
  }
}
