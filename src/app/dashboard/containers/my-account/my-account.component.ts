import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../../../auth/store/auth.actions';
import { AuthState } from '../../../auth/store/auth.state';
import { Observable } from 'rxjs';
import { Auth } from '../../../auth/models/auth.model';

@Component({
  selector: 'hab-my-account',
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
