import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { FriendService } from '../../../core/services/friends.service';

@Component({
  selector: 'sn-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent {
  profileImageUrl = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private friendService: FriendService
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
  }
}
