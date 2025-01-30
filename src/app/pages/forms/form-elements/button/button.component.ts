import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    standalone: false
})
export class AppButtonComponent {
  constructor() {}

  //   reactive form
  fontStyleControl = new FormControl('');
  fontStyle?: string;
}
