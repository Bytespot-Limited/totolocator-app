import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavService } from '../../../../services/nav.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { AuthService } from '../../../../services/auth.service';
import { AccountService } from '../../../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmDialogComponent } from './logout-confirm-dialog.component';

@Component({
    selector: 'app-sidebar',
    imports: [
        NgScrollbarModule,
        TablerIconsModule,
        MaterialModule,
        RouterModule,
        AppNavItemComponent,
        CommonModule
    ],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  navopt = this.navService.showClass;
  displayUsername = '';
  profileImageUrl = 'assets/images/profile/user-avatar.png';

  constructor(
    public navService: NavService,
    private authService: AuthService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.displayUsername = this.authService.getUsername();
    this.accountService.getAccount().subscribe(acc => {
      this.displayUsername = acc.login || this.displayUsername;
      if (acc.imageUrl) this.profileImageUrl = acc.imageUrl;
    });
  }

  confirmLogout(): void {
    this.dialog.open(LogoutConfirmDialogComponent, { width: '360px', maxWidth: '95vw' })
      .afterClosed().subscribe(confirmed => {
        if (confirmed) this.authService.logout();
      });
  }
}
