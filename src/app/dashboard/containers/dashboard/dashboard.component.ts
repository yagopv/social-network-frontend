import { Component, OnInit, HostBinding } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetFriends } from '../../store/friend.actions';
import { Profile } from '../../../modules/auth/models/profile.model';
import { AuthState } from '../../../modules/auth/store/auth.state';
import {
  GetUserProfile,
  Logout
} from '../../../modules/auth/store/auth.actions';

@Component({
  selector: 'sn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(AuthState.getUser) user$: Profile;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch([new GetUserProfile(), new GetFriends()]);
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
