import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-logout-confirm-dialog',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <h2 mat-dialog-title>Confirm Logout</h2>
    <mat-dialog-content>Are you sure you want to log out?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button [mat-dialog-close]="false">Cancel</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true" class="m-l-8">Logout</button>
    </mat-dialog-actions>
  `
})
export class LogoutConfirmDialogComponent {}
