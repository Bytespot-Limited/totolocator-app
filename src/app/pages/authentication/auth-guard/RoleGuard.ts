import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const required: string[] = route.data['roles'] ?? [];
    if (required.length === 0) return true;

    const userRoles = this.authService.getRoles();
    const allowed = required.some((r) => userRoles.includes(r));
    if (!allowed) {
      this.authService.roleBasedRedirect();
      return false;
    }
    return true;
  }
}
