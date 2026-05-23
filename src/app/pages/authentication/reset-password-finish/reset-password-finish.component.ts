import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AccountService } from '../../../services/account.service';

function passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
  return g.get('newPassword')?.value === g.get('confirmPassword')?.value
    ? null
    : { mismatch: true };
}

@Component({
  selector: 'app-reset-password-finish',
  templateUrl: './reset-password-finish.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TablerIconsModule,
  ],
})
export class ResetPasswordFinishComponent implements OnInit {
  key: string | null = null;
  keyMissing = false;
  submitted = false;
  submitting = false;
  errorMessage = '';

  form = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.key = this.route.snapshot.queryParamMap.get('key');
    if (!this.key) this.keyMissing = true;
  }

  submit(): void {
    if (!this.key || this.form.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    this.accountService.resetPasswordFinish(this.key, this.form.value.newPassword!).subscribe({
      next: () => {
        this.submitted = true;
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'The reset key is invalid or has expired. Please request a new password reset.';
        this.submitting = false;
      },
    });
  }
}
