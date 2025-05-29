import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
    selector: 'app-branding',
    imports: [RouterModule],
    template: `
    <div class="branding d-none d-lg-flex align-items-center">
      <a [routerLink]="['/dashboards/guardian']" class="d-flex">
        <img
          src="./assets/images/logos/totolocator_logo.png"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
}
