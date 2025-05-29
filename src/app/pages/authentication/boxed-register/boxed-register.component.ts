import {Component} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginErrorResponse, LoginResponse} from "../boxed-login/LoginResponse";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../../environment";

@Component({
  selector: 'app-boxed-register',
  templateUrl: './boxed-register.component.html',
  standalone: false
})


export class AppBoxedRegisterComponent {
  loginResponse: LoginResponse;
  loginErrorResponse: LoginErrorResponse;
  options = this.settings.getOptions();
  loginSent: boolean = false;

  constructor(private settings: CoreService, private router: Router, private http: HttpClient,
              public dialog: MatDialog) {
  }

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    termsAccepted: new FormControl('', [Validators.requiredTrue]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    var payload = {
      'login': this.form.value.phoneNumber,
      'firstName': this.form.value.firstName,
      'lastName': this.form.value.lastName,
      'email': this.form.value.email,
      'password': this.form.value.password,
      'langKey': 'en',
      'termsAndConditionsAccepted': this.form.value.termsAccepted
    }
// Submit the form
    this.http.post(environment.apiUrl.concat("register"), payload)
    .subscribe(
      (res: any) => {
        this.loginResponse = res;
        if (this.loginResponse == null) {
          console.log("Error fetching user token: ", this.loginResponse);
          this.loginErrorResponse = res;
        }
        // User successfully logged in
        if (this.loginResponse.code == 200) {
          console.log("Successfully created user : ", this.loginResponse);
          this.router.navigate(['/authentication/registration-success']);
        }

        // Error customer login
        if (this.loginResponse.code != 200) {
          console.log("User failed to login: ", this.loginErrorResponse);
          this.loginSent = true;
        }
      },
      (error: LoginErrorResponse) => { // Error handler
        console.error("An error occurred during login:", error);

        // console.error("An error occurred during login:", this.loginErrorResponse);
        // You can add more specific error handling here based on the 'error' object
        // For example, you might check for specific HTTP status codes or error messages
        this.router.navigate(['/error']); // Or navigate to a specific error page
        //this.loginSent = true;
      }
    );


    // If correct, navigate to the dashboard, given the authorities in the token
//    this.router.navigate(['/apps']);
  }
}

