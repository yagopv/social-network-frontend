import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStore } from '../../../../core/store/user.store';
import { AuthStore } from '../../../../core/store/auth.store';
import { Router } from '@angular/router';
import { Auth } from '../../../../core/models/user.models';

@Component({
  selector: 'sn-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent {
  user$: Observable<Auth>;
  profileImageUrl = '';

  constructor(
    private router: Router,
    private authStore: AuthStore,
    private userStore: UserStore
  ) {
    this.userStore.state$.subscribe(user => {
      if (user && user.avatarUrl !== undefined) {
        this.profileImageUrl =
          user.avatarUrl || `https://api.adorable.io/avatars/128/${user.uuid}`;
      }
    });
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
