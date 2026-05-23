import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../../vertical/sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { BrandingComponent } from '../../vertical/sidebar/branding.component';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AccountInfo, AccountService } from 'src/app/services/account.service';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface msgs {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
  queryParams?: Record<string, string>;
}

@Component({
    selector: 'app-search-dialog',
    imports: [MaterialModule, RouterModule, TablerIconsModule, FormsModule, NgForOf],
    templateUrl: 'search-dialog.component.html'
})
export class AppHorizontalSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });
}


@Component({
    selector: 'app-horizontal-header',
    imports: [MaterialModule, RouterModule, TablerIconsModule, BrandingComponent, NgFor, NgIf, AppHorizontalSearchDialogComponent],
    templateUrl: './header.component.html'
})
export class AppHorizontalHeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  displayUsername = '';
  displayEmail = '';
  displayRole = '';

  private readonly roleLabels: Record<string, string> = {
    ROLE_ADMIN: 'Administrator',
    ROLE_USER: 'School Admin',
    ROLE_DRIVER: 'Driver',
    ROLE_GUARDIAN: 'Guardian',
  };

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];

  constructor(
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private authService: AuthService,
    private accountService: AccountService,
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.displayUsername = this.authService.getUsername();
    const roles = this.authService.getRoles();
    this.displayRole = roles.length > 0 ? (this.roleLabels[roles[0]] ?? roles[0]) : '';
    this.accountService.getAccount().subscribe({
      next: (acc) => {
        this.displayUsername = acc.login || this.displayUsername;
        this.displayEmail = acc.email;
        this.syncPlaceholderEmail(acc);
      },
    });
  }

  private syncPlaceholderEmail(acc: AccountInfo): void {
    if (!this.authService.isKeycloakUser()) return;
    if (!acc.email?.endsWith('@localhost')) return;
    const jwtEmail = this.authService.getEmailFromToken();
    if (!jwtEmail || jwtEmail === acc.email) return;
    this.accountService.updateAccount({ ...acc, email: jwtEmail }).subscribe();
    this.displayEmail = jwtEmail;
  }

  logout(): void {
    this.authService.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppHorizontalSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'New message received',
      subtitle: 'Salma sent you new message',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'New Payment received',
      subtitle: 'Check your earnings',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly completed tasks',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
  ];

  msgs: msgs[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Andrew McDownland',
      subtitle: 'Message blocked. Try Again',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'Christopher Jamil',
      subtitle: 'This message cannot be sent',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'Julia Roberts',
      subtitle: 'You are trying to reach location.',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'James Johnson',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Maria Rodriguez',
      subtitle: 'Congrats for your success',
    },
  ];

  profiledd: profiledd[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-account.svg',
      title: 'My Profile',
      subtitle: 'Account Settings',
      link: '/theme-pages/account-setting',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-inbox.svg',
      title: 'My Password',
      subtitle: 'Change your password',
      link: '/theme-pages/account-setting',
      queryParams: { tab: 'password' },
    },
  ];
}

