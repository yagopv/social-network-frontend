import { Component, OnInit, HostBinding } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout, GetUserProfile } from '../../../auth/store/auth.actions';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';
import { GetFriends } from '../../store/friend.actions';

@Component({
  selector: 'sn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(AuthState.getUser) user$: Profile;
  @HostBinding('class') layout: string;

  constructor(private store: Store) {}

  toggleLayout(layoutType: string) {
    this.layout = layoutType;
  }

  ngOnInit() {
    this.store.dispatch([new GetUserProfile(), new GetFriends()]);
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
