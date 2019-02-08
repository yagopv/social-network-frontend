import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout, GetUserProfile } from '../../../auth/store/auth.actions';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'sn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(AuthState.getUser) user$: Profile;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetUserProfile());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
