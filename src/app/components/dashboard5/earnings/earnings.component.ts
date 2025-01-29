import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-earnings',
    imports: [MaterialModule, TablerIconsModule],
    templateUrl: './earnings.component.html'
})
export class AppEarningsComponent {
  constructor() {}
}
