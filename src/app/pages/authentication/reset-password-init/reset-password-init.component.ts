import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-reset-password-init',
  templateUrl: './reset-password-init.component.html',
  standalone: false,
})
export class ResetPasswordInitComponent {
  submitted = false;
  submitting = false;
  errorMessage = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private accountService: AccountService) {}

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    this.accountService.resetPasswordInit(this.form.value.email!).subscribe({
      next: () => {
        this.submitted = true;
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'An error occurred. Please try again.';
        this.submitting = false;
      },
    });
  }
}
