import { Component } from '@angular/core';
import { AuthStore } from '../../../../../core/store/auth.store';
import { UserStore } from '../../../../../core/store/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent {
  profileImageUrl = '';

  constructor(
    private router: Router,
    private userStore: UserStore,
    private authStore: AuthStore
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
