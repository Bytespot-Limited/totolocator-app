import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    standalone: false
})
export class AppBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}
