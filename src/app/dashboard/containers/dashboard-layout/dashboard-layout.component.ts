import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../../../auth/store/auth.actions';
import { AuthStateModel, AuthState } from '../../../auth/store/auth.state';

@Component({
  selector: 'hab-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  @Select(AuthState) user$: AuthStateModel;

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
