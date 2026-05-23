import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
import { LoginErrorResponse, LoginResponse } from './LoginResponse';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-boxed-login',
  templateUrl: './boxed-login.component.html',
  standalone: false,
})
export class AppBoxedLoginComponent implements OnInit {
  loginResponse: LoginResponse;
  options = this.settings.getOptions();
  loginSent: boolean = false;
  loginError: string = '';

  constructor(
    private settings: CoreService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Redirect already-authenticated users (including those returning from Keycloak)
    if (this.authService.getToken()) {
      this.authService.roleBasedRedirect();
    }
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    const payload = {
      username: this.form.value.uname,
      password: this.form.value.password,
      rememberMe: true,
    };

    this.http.post(environment.apiUrl.concat('authenticate'), payload).subscribe(
      (res: any) => {
        this.loginResponse = res;
        if (this.loginResponse.code == 200) {
          localStorage.setItem('username', payload.username as string);
          localStorage.setItem('token', this.loginResponse.token);
          this.authService.loadRolesFromToken();
          this.authService.roleBasedRedirect();
        } else {
          this.loginSent = true;
          this.loginError = 'Invalid username or password.';
        }
      },
      (error: LoginErrorResponse) => {
        console.error('Login error:', error);
        this.loginSent = true;
        this.loginError = 'Invalid username or password.';
      },
    );
  }

  loginWithSSO(): void {
    this.authService.login();
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
