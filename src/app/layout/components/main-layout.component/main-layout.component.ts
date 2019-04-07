import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
  Logout,
  GetUserProfile
} from '../../../features/auth/store/auth.actions';
import { AuthState } from '../../../features/auth/store/auth.state';
import { Profile } from '../../../features/auth/models/profile.model';
import { GetFriends } from '../../../features/friends/store/friend.actions';

@Component({
  selector: 'sn-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  @Select(AuthState.getUser) user$: Profile;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch([new GetUserProfile(), new GetFriends()]);
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
