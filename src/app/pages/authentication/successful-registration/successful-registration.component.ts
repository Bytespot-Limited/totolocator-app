import {Component} from '@angular/core';

import {CoreService} from "../../../services/core.service";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-successful-registration',
  templateUrl: './successful-registration.component.html',
  imports: [
    MatCardModule,
    RouterLink
  ]
})
export class SuccessfulRegistrationComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {
  }
}
