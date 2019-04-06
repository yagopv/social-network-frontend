import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../modules/auth/store/auth.state';

import { Logout } from '../../../modules/auth/store/auth.actions';
import { Auth } from '../../../modules/auth/models/auth.model';

@Component({
  selector: 'sn-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  @Select(AuthState.getUser) user$: Observable<Auth>;
  profileImageUrl = '';

  constructor(private store: Store) {
    this.user$.subscribe(user => {
      if (user && user.avatarUrl !== undefined) {
        this.profileImageUrl =
          user.avatarUrl || `https://api.adorable.io/avatars/128/${user.uuid}`;
      }
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
