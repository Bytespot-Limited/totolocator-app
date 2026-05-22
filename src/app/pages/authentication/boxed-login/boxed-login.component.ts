import {Component} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../../../environment";
import {LoginErrorResponse, LoginResponse} from "./LoginResponse";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: 'app-boxed-login',
    templateUrl: './boxed-login.component.html',
    standalone: false
})
export class AppBoxedLoginComponent {
  loginResponse: LoginResponse;
  loginErrorResponse: LoginErrorResponse;
  options = this.settings.getOptions();
  loginSent: boolean = false;

  constructor(private settings: CoreService, private router: Router, private http: HttpClient,
              public dialog: MatDialog) {
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
        // User successfully logged in
        if (this.loginResponse.code == 200) {
          console.log("Successfully fetched user token: ", this.loginResponse);
          localStorage.setItem('username', <string>payload.username);
          localStorage.setItem('token', this.loginResponse.token);
          this.router.navigate(['/dashboards/harmony-admin']);
        } else {
          this.loginSent = true;
        }
      },
      (error: LoginErrorResponse) => {
        console.error("An error occurred during login:", error);
        this.loginSent = true;
      }
    );


    // If correct, navigate to the dashboard, given the authorities in the token
//    this.router.navigate(['/apps']);
  }
}

