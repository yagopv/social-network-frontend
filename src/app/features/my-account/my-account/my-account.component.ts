import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'sn-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent {
  profileImageUrl = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    const { currentUser } = this.userService;

    if (currentUser && currentUser.avatarUrl !== undefined) {
      this.profileImageUrl =
        currentUser.avatarUrl ||
        `https://api.adorable.io/avatars/128/${currentUser.uuid}`;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
