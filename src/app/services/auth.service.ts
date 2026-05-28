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
    try {
      const authenticated = await this.keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256' });
      if (authenticated && this.keycloak.token) {
        localStorage.setItem('token', this.keycloak.token);
        this.loadRolesFromToken();
      }
    } catch {
      // Keycloak SSO check failed (e.g. third-party cookie blocked) — app still boots,
      // AuthGuard will redirect to login if no token exists.
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
    if (this.keycloak.authenticated) {
      // Keycloak SSO session active — do a proper OIDC logout.
      // redirectUri must match an allowed post-logout URI on the Keycloak client.
      this.keycloak.logout({ redirectUri: window.location.origin + '/' });
    } else {
      this.router.navigate(['/authentication/login']);
    }
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const auth = payload['auth'];
      const all: string[] = Array.isArray(auth)
        ? auth
        : typeof auth === 'string'
        ? auth.split(' ')
        : [];
      // Keep only ROLE_* entries; Keycloak also emits default realm roles
      return all.filter((r: string) => r.startsWith('ROLE_'));
    } catch {
      return [];
    }
  }

  loadRolesFromToken(): void {
    this.permissionsService.loadPermissions(this.getRoles());
  }

  isKeycloakUser(): boolean {
    return !!this.keycloak.authenticated;
  }

  getUsername(): string {
    return localStorage.getItem('username') ?? this.getTokenClaim('sub') ?? '';
  }

  getEmailFromToken(): string | null {
    return this.getTokenClaim('email');
  }

  private getTokenClaim(claim: string): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]))[claim] ?? null;
    } catch {
      return null;
    }
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