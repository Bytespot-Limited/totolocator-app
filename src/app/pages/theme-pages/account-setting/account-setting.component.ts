import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountInfo, AccountService } from '../../../services/account.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../../environment';

function passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
  return g.get('newPassword')?.value === g.get('confirmPassword')?.value
    ? null
    : { mismatch: true };
}

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  standalone: false,
})
export class AppAccountSettingComponent implements OnInit {
  account: AccountInfo | null = null;
  loading = true;
  saving = false;
  isKeycloakUser = false;
  keycloakAccountUrl = '';
  pwSaving = false;
  pwError = '';
  selectedTabIndex = 0;

  // Tab index map — keep in sync with template tab order
  private readonly TAB_MAP: Record<string, number> = {
    account: 0,
    password: 1,
    security: 2,
  };

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordForm = new FormGroup(
    {
      currentPassword: new FormControl('', Validators.required),
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
    private accountService: AccountService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isKeycloakUser = this.authService.isKeycloakUser();
    this.keycloakAccountUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/account/#/security/signingin`;

    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab && this.TAB_MAP[tab] !== undefined) {
      this.selectedTabIndex = this.TAB_MAP[tab];
    }

    this.accountService.getAccount().subscribe({
      next: (acc) => {
        this.account = acc;
        this.profileForm.patchValue(acc);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.saving = true;
    this.accountService.updateAccount(this.profileForm.value as Partial<AccountInfo>).subscribe({
      next: () => {
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        this.saving = false;
      },
      error: () => {
        this.snackBar.open('Failed to update profile', 'Close', { duration: 3000 });
        this.saving = false;
      },
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    this.pwSaving = true;
    this.pwError = '';
    const { currentPassword, newPassword } = this.passwordForm.value;
    this.accountService.changePassword(currentPassword!, newPassword!).subscribe({
      next: () => {
        this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 });
        this.passwordForm.reset();
        this.pwSaving = false;
      },
      error: (err) => {
        this.pwError =
          err.status === 400
            ? 'Current password is incorrect'
            : 'An unexpected error occurred. Please try again.';
        this.pwSaving = false;
      },
    });
  }
}
