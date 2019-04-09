import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';
import { UserStore } from '../store/user.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userStore: UserStore) {}

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    const currentUser = this.userStore.state;

    if (currentUser && currentUser.accessToken) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { ['return-url']: snapshot.url }
    });

    return false;
  }
}
