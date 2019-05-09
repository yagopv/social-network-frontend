import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    const currentUser = this.authService.tokens;

    if (currentUser && currentUser.accessToken) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { ['return-url']: snapshot.url }
    });

    return false;
  }
}
