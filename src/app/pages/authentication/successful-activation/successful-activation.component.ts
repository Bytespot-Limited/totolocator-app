import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CoreService} from "../../../services/core.service";
import {MatButtonModule} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment";

@Component({
  selector: 'app-successful-activation',
  imports: [
    MatCardModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './successful-activation.component.html',
  styleUrl: './successful-activation.component.scss'
})
export class SuccessfulActivationComponent {
  options = this.settings.getOptions();
  status: string
  title: string
  message: string
  accessLogin: boolean;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const key = params.get('key');
      console.log('Activation key:', key);

      if (key) {
        this.activateAccount(key);
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private settings: CoreService
  ) {

  }

  /**
   * Fetch terminal information
   * @param id
   */
  activateAccount(key: string) {
    this.http.get(environment.apiUrl.concat( "activate?key=").concat(key))
    .subscribe((res: any) => {
      console.log("Activating user account: {}", res)
      if (res.code == 200) {
        this.status = 'Passed';
        this.title = "Your account has been verified successfully"
        this.message = "";
        this.accessLogin = true

      }else {
        this.status = 'Failed';
        this.title = "Sorry we could not verify your account"
        this.message = "The provided verification key is invalid. Please contact your admin help&#64;totolocator.org for further assistance!"
        this.accessLogin = false
      }


    })
  }

}
