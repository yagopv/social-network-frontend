import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    const currentUser = this.store.selectSnapshot(state => state.auth);

    if (currentUser && currentUser.accessToken) {
      return true;
    }

    this.router.navigate(['/auth/login'], {
      queryParams: { ['return-url']: snapshot.url }
    });

    return false;
  }
}
