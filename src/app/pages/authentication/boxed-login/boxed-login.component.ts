import {Component} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment";
import {LoginRequest, LoginResponse, LoginErrorResponse} from "./LoginResponse";


@Component({
  selector: 'app-boxed-login',
  templateUrl: './boxed-login.component.html',
})
export class AppBoxedLoginComponent {
  loginResponse: LoginResponse;
  loginErrorResponse: LoginErrorResponse;
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private http: HttpClient) {
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    var payload = {
      'username': this.form.value.uname,
      'password': this.form.value.password,
      'rememberMe': true

    }
// Submit the form
this.http.post(environment.apiUrl.concat("authenticate"), payload)
  .subscribe(
    (res: any) => {
      this.loginResponse = res;
            if (this.loginResponse == null) {
              console.log("Error fetching user token: ", this.loginResponse);
              this.router.navigate(['/error']);
            }
            if (this.loginResponse.code == 200) {
              console.log("Successfully fetched user token: ", this.loginResponse);
              this.router.navigate(['/apps']);
            }
            if (this.loginResponse.code != 200) {
              console.log("Error response when fetching user token: ", this.loginResponse);
              this.router.navigate(['/error']);
            }
          },
          (error: any) => { // Error handler
            this.loginErrorResponse = error
            console.error("An error occurred during login:", this.loginErrorResponse);
            // You can add more specific error handling here based on the 'error' object
            // For example, you might check for specific HTTP status codes or error messages
            this.router.navigate(['/error']); // Or navigate to a specific error page
          }
  );



    // If correct, navigate to the dashboard, given the authorities in the token
    this.router.navigate(['/apps']);
  }
}

