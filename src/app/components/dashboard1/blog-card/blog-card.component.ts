import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-blog-card',
    imports: [TablerIconsModule, MaterialModule],
    templateUrl: './blog-card.component.html'
})
export class AppBlogCardComponent {
  constructor() {}
}
