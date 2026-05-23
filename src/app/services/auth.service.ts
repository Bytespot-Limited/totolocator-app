import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';
import { NgxPermissionsService } from 'ngx-permissions';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak: Keycloak = new Keycloak({
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId,
  });

  constructor(private router: Router, private permissionsService: NgxPermissionsService) {}

  async init(): Promise<void> {
    const authenticated = await this.keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256' });
    if (authenticated && this.keycloak.token) {
      localStorage.setItem('token', this.keycloak.token);
      this.loadRolesFromToken();
    }
  }

  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin + '/authentication/login' });
  }

  loginWithGoogle(): void {
    this.keycloak.login({ idpHint: 'google', redirectUri: window.location.origin + '/authentication/login' });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.permissionsService.flushPermissions();
    this.keycloak.logout({ redirectUri: window.location.origin + '/authentication/login' });
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const auth: string = payload['auth'] ?? '';
      return auth.split(' ').filter((r: string) => r.length > 0);
    } catch {
      return [];
    }
  }

  loadRolesFromToken(): void {
    this.permissionsService.loadPermissions(this.getRoles());
  }

  roleBasedRedirect(): void {
    const roles = this.getRoles();
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/dashboards/harmony-admin']);
    } else if (roles.includes('ROLE_USER')) {
      this.router.navigate(['/dashboards/school-admin']);
    } else if (roles.includes('ROLE_DRIVER')) {
      this.router.navigate(['/dashboards/driver']);
    } else if (roles.includes('ROLE_GUARDIAN')) {
      this.router.navigate(['/dashboards/guardian']);
    }
  }
}