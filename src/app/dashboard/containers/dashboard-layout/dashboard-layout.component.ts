import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout, GetUserProfile } from '../../../auth/store/auth.actions';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'hab-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  @Select(AuthState.getUser) user$: Profile;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetUserProfile());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
